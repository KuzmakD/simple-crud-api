import usersRepository from '../users/users.repository';
import * as uuid from 'uuid';
import { usersDB } from '../db/users';


describe('Get Users. Server', () => {
  test('should get all users from database', () => {
    const allUsers = usersRepository.getUsers();
    expect(allUsers).toEqual(usersDB);
  });

  test('should return undefined when getting a user by a non-existent ID', () => {
    const nonExistentId = uuid.v4();
    const user = usersRepository.getUserById(nonExistentId);
    expect(user).toBeUndefined();
  });

});

describe('Create user. Server ', () => {
  test('should create a new user and return the user object with a generated ID', () => {
    const newUser = { username: 'John Doe', age: 30, hobbies: ['reading'] };
    const createdUser = usersRepository.createUser(newUser);
  
    expect(createdUser).toHaveProperty('id');
    expect(createdUser.username).toBe(newUser.username);
    expect(createdUser.age).toBe(newUser.age);
    expect(usersDB).toContainEqual(createdUser);
  });
});

describe('Update user. Server ', () => {
  test('should update an existing user and return the updated user object', () => {
    const id = uuid.v4();
    const existingUser = { id, username: 'Jane Doe', age: 25, hobbies: ['swimming'] };
    usersDB.push(existingUser);

    const updatedUserData = { username: 'Jane Smith', age: 26, hobbies: ['swimming', 'cycling'] };
    const updatedUser = usersRepository.updateUser(existingUser.id, updatedUserData);

    expect(updatedUser).toBeDefined();
    expect(updatedUser?.id).toBe(existingUser.id);
    expect(updatedUser?.username).toBe(updatedUserData.username);
    expect(updatedUser?.age).toBe(updatedUserData.age);
    expect(updatedUser?.hobbies).toEqual(updatedUserData.hobbies);
  });

  test('should return undefined when updating a user with a non-existent ID', () => {
    const nonExistentId = uuid.v4();
    const updatedUserData = { username: 'Non Existent', age: 40, hobbies: ['none'] };
    const result = usersRepository.updateUser(nonExistentId, updatedUserData);

    expect(result).toBeUndefined();
  });
});

describe('Delete user. Server ', () => {
  test('should delete an existing user and return the deleted user object', () => {
    const id = uuid.v4();
    const existingUser = { id, username: 'Alice', age: 28, hobbies: ['hiking'] };
    usersDB.push(existingUser);
  
    const deletedUser = usersRepository.deleteUser(existingUser.id);
  
    expect(deletedUser).toBeDefined();
    expect(deletedUser?.id).toBe(existingUser.id);
    expect(deletedUser?.username).toBe(existingUser.username);
    expect(deletedUser?.age).toBe(existingUser.age);
    expect(deletedUser?.hobbies).toEqual(existingUser.hobbies);
    expect(usersDB).not.toContainEqual(existingUser);
  });

  test('should return undefined when deleting a user with a non-existent ID', () => {
    const nonExistentId = uuid.v4();
    const result = usersRepository.deleteUser(nonExistentId);
  
    expect(result).toBeUndefined();
  });
});


