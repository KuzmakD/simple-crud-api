import { IncomingMessage, ServerResponse } from 'node:http';
import * as uuid from 'uuid';
import usersRepository from './users.repository';
import { errorMessages, statusCode } from '../utils/errors';
import { isValidUser } from '../utils/validate';
import { IUser } from '../types/interface';

const getUsers = async (res: ServerResponse) => {
  const users = await usersRepository.getUsers();

  res.writeHead(statusCode.ok, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

const getUserById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  if (!uuid.validate(id)) {
    res.writeHead(statusCode.badRequest, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessages.invalidUserId }));
    return;
  } 
  const userById = await usersRepository.getUserById(id);
  
  if (userById) {
    res.writeHead(statusCode.ok, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Get user info for id: ${id}`, userById }));
  } else {
    res.writeHead(statusCode.notFound, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      statusCode: statusCode.notFound,
      message: errorMessages.userNotFound,
      userId: id,
    }));
  }
};

const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    let body = '';
    let newUser: IUser;

    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { username, age, hobbies } = JSON.parse(body);

        if (isValidUser(username, age, hobbies)) {
          newUser = usersRepository.createUser({username, age, hobbies});
        } else {
          res.writeHead(statusCode.badRequest, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: errorMessages.invalidUserData }));
        }

        res.writeHead(statusCode.created, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newUser));
      } catch (err) {
        res.writeHead(statusCode.badRequest, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: errorMessages.invalidRequestBody }));
      }
    });
  } catch (err) {
    console.error(err);
    res.writeHead(statusCode.internalServerError);
    res.end(JSON.stringify({ message: errorMessages.internalServerError }));
  };
};

const updateUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  res.writeHead(200);
  res.end(JSON.stringify({ message: 'Update user info!' }));
  return res;
};

const deleteUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  console.log('Delete user', id);

  if (!uuid.validate(id)) {
    res.writeHead(statusCode.badRequest, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorMessages.invalidUserId }));
    return;
  }

  const removedUserId = await usersRepository.deleteUser(id);

  if (removedUserId) {
    res.writeHead(statusCode.noContent, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      statusCode: statusCode.noContent,
      message: `User with id: '${id}' was successfully removed.` }));
  } else {
    res.writeHead(statusCode.notFound, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: errorMessages.userNotFound }));
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
