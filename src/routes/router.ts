import { IncomingMessage, ServerResponse } from 'node:http';
import url from 'node:url';
import { v4 as uuidv4 } from 'uuid';
import usersController from '../users/users.controller';

export const routes = async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");
  
  if (req.url) {
    const reqUrl = url.parse(req.url, true);
    const id = uuidv4();

    switch (req.method) {
      case 'GET':
        if (reqUrl.pathname === '/api/users') {
          usersController.getUsers(req, res);
        } else if (reqUrl.pathname?.startsWith('/api/users/')) {
          usersController.getUserById(req, res, id);
        };
        break;
      case 'POST':
        if (reqUrl.pathname === '/api/users') {
          usersController.createUser(req, res);
        } else {
          res.writeHead(400);
          res.end(JSON.stringify({ message: 'Not found!' }));
        }
        break;
      case 'PUT':
        if (reqUrl.pathname?.startsWith('/api/users/')) {
          usersController.updateUser(req, res, id);
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ message: 'Not found!' }));
        }
        break;
      case 'DELETE':
        if (reqUrl.pathname?.startsWith('/api/users/')) {
          usersController.deleteUser(req, res, id);
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ message: 'Not found!' }));
        }
        break;
      default:
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: 'Method not allowed!' }));
    }
  }
}