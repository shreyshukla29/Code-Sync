// services/user.service.js
import { findUserById, createNewRoom, updateUserRoom, clearUserRoom } from '../repositories/user.repository.js';
import { v4 as uuidv4 } from 'uuid';

export const loginService = async (loginData) => {
  // Logic for verifying user login, setting session/cookies, etc.
};

export const logoutService = async (user) => {
  // Logic for clearing user session/cookies
};

export const createRoomService = async (userId) => {
  const roomId = uuidv4();
  const user = await findUserById(userId);

  if (!user) throw new Error('User not found');

  await createNewRoom(userId, roomId);
  return { message: 'Room created successfully', roomId };
};

export const joinRoomService = async (userId, roomId) => {
  const user = await findUserById(userId);

  if (!user) throw new Error('User not found');

  await updateUserRoom(userId, roomId, 'participant');
  return { message: 'Joined room successfully', roomId };
};
