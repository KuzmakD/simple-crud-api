import { IUser } from '../types/interface';
import { v4 as uuidv4 } from 'uuid';

let users = new Array<IUser>;

const getUsers = (): Array<IUser> => {
  console.log('getUsers: ', users);
  return users;
};

const getUserById = (id: string): IUser | undefined => {
  return users.find((user) => user.id === id);
};

const createUser = (user: IUser): IUser => {
  const newUser = {
    id: uuidv4(),
    ...user,
  }
  users.push(newUser);

  return newUser;
}

const updateUser = (id: string, updatedUser: IUser): IUser | undefined => {
  const user = users.find((user) => user.id === id);
  if (user) {
    Object.assign(user, updatedUser);
    return user;
  } else {
    return undefined;
  }
};

const deleteUser = (id: string): IUser | undefined => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0];
    return deletedUser;
  } else {
    return undefined;
  }
};


export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
