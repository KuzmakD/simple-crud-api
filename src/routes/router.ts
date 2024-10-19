import { IncomingMessage, ServerResponse } from 'node:http';
import url from 'node:url';

export const routes = async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");
  
  if (req.url) {
    const reqUrl = url.parse(req.url, true);
    switch (req.method) {
      case 'GET':
        if (reqUrl.pathname === '/api/users') {
          res.writeHead(200);
          res.end(JSON.stringify({ message: 'Get all users info!' }));
        } else if (reqUrl.pathname?.startsWith('/api/users/')) {
          res.writeHead(200);
          res.end(JSON.stringify({ message: 'Get user info!' }));;
        };
        break;
      case 'POST':
        if (reqUrl.pathname === '/api/users') {
          res.writeHead(201);
          res.end(JSON.stringify({ message: 'Create new user!' }));
        } else {
          res.writeHead(400);
          res.end(JSON.stringify({ message: 'Not found!' }));
        }
        break;
      case 'PUT':
        if (reqUrl.pathname?.startsWith('/api/users/')) {
          res.writeHead(200);
          res.end(JSON.stringify({ message: 'Update user info!' }));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ message: 'Not found!' }));
        }
        break;
      case 'DELETE':
        if (reqUrl.pathname?.startsWith('/api/users/')) {
          res.writeHead(204);
          res.end(JSON.stringify({ message: 'Delete user!' }));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ message: 'Not found!' }));
        }
        break;
      default:
        res.writeHead(405);
        res.end(JSON.stringify({ message: 'Method not allowed!' }));
    }
  }
}