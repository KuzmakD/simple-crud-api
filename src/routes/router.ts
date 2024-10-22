import { IncomingMessage, ServerResponse } from 'node:http';
import url from 'node:url';
import usersController from '../users/users.controller';
import { errorMessages, statusCode } from '../utils/errors';

export const routes = async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");
  
  if (req.url) {
    const reqUrl = url.parse(req.url, true);
    const parametersUrl = reqUrl.path?.split('/');

    if (!parametersUrl) {
      res.writeHead(statusCode.internalServerError, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: 'This URL is not acceptable! Please, input correct URL!' }));
      return;
    }

    const userId = parametersUrl[3];
    
    if (req.method === 'GET' && reqUrl.path === '/api/users') {
      await usersController.getUsers(res);
    } else if (req.method === 'GET' && reqUrl.path?.startsWith('/api/users/')) {
      await usersController.getUserById(req, res, userId);
    } else if (req.method === 'POST' && reqUrl.path === '/api/users') {
      await usersController.createUser(req, res);
    } else if (req.method === 'PUT' && reqUrl.path?.startsWith('/api/users/')) {
      await usersController.updateUser(req, res, userId);
    } else if (req.method === 'DELETE' && reqUrl.path?.startsWith('/api/users/')) {
      await usersController.deleteUser(req, res, userId);
    } else {
      res.writeHead(statusCode.notFound, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ statusCode: statusCode.notFound, message: errorMessages.invalidURL }));
    }
  }
}
