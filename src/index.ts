import http from 'node:http';
import os from 'node:os';
import cluster from 'node:cluster';
import dotenv from 'dotenv';
import { routes } from './routes/router';
import { isModeCluster } from './isCluster';
import { IUser } from './types/interface';
import { usersDB } from './db/users';
import { writeFile } from './utils/writeFile';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 4000;

console.log('START SERVER');
const server = http.createServer((req, res) => {
  routes(req, res);
});
const workers: any[] = [];
let nextWorker = 0;

if (isModeCluster() && false) {
  if (cluster.isPrimary) {
    const numCPUs = os.availableParallelism() - 1;
      console.log('numCPUs: ', numCPUs);
      console.log(`Master ${process.pid} is running`);

      for (let i = 0; i < numCPUs; i++) {
        workers.push(cluster.fork({ SERVER_PORT: `${+SERVER_PORT + i + 1}` }));
      }

      server.listen(SERVER_PORT, async () => {
        await writeFile('[]');
        console.log(` Worker server ${process.pid} listening on http://localhost:${SERVER_PORT}. PLEASE WAITING FOR WORKERS!!!`);
    });
    server.on('request', async (req, res) => {
      if (req.method === 'GET' ||  req.method === 'DELETE') {
        workers[nextWorker].send({ type: 'request', data: { url: req.url, method: req.method, data: null } });
        nextWorker < Object.values(workers).length - 1 ? nextWorker++ : nextWorker = 0;
      } else {
        req.on('data', (d) => {
            const data = d.toString();
            workers[nextWorker].send({ type: 'request', data: { url: req.url, method: req.method, data } });
            nextWorker < Object.values(workers).length - 1 ? nextWorker++ : nextWorker = 0;
        })
      }

      cluster.once('message', (worker: any, message: any) => {
        if (message.type === 'response') {
            const {statusCode, contentType, data} = message;
            res.writeHead(statusCode, { "Content-Type": `${contentType}` });
            res.end(JSON.stringify(data));
        }
      });
    })
    
    process.on('SIGINT', async () => {
      await writeFile('[]');
      process.exit();
    });
  } else {
    server.listen(SERVER_PORT, async () => {
      await writeFile('[]');
      console.log(`Worker ${process.pid} listening on http://localhost:${SERVER_PORT}`);
    });
    server.on('request', async (req, res) => {
        await routes(req, res);
    });
  
    process.on('message', (message: any) => {
      const postData = JSON.stringify(message.data.data);
      const options = {
          hostname: 'localhost',
          port: SERVER_PORT,
          path: message.data.url,
          method: message.data.method,
          headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
          }
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk.toString();
        });
        res.on('end', () => {});
      });

      req.on('error', (error) => {
        console.error(error);
      });

      message.data.data && req.write(message.data.data);
      req.end();
    });
  }
} else {
  server.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
  });    
}

