import { IncomingMessage, ServerResponse } from 'http';


const getUsers = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200);
  res.end(JSON.stringify({ message: 'Get all users info!' }));
  return res;
};

const getUserById = (req: IncomingMessage, res: ServerResponse, id: string) => {
  res.writeHead(200);
  res.end(JSON.stringify({ message: `Get user info for id: ${id}` }));
  return res;
}

const createUser = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(201);
  res.end(JSON.stringify({ message: 'Create new user!' }));
  return res;
}

const updateUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
  res.writeHead(200);
  res.end(JSON.stringify({ message: 'Update user info!' }));
  return res;
}

const deleteUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
  res.writeHead(204);
  res.end(JSON.stringify({ message: 'Delete user!' }));
  return res;
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
