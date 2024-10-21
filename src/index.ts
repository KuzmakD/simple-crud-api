import http from 'node:http';
import dotenv from 'dotenv';
import { routes } from './routes/router';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 4000;

console.log('START SERVER');
const server = http.createServer((req, res) => {
  routes(req, res);
});

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
