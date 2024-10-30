// repositories/user.repository.js
import User from '../models/user.schema.js';

export const findUserById = async (userId) => {
  return await User.findById(userId);
};

export const createNewRoom = async (userId, roomId) => {
  return await User.findByIdAndUpdate(
    userId,
    { activeRoom: { roomId, role: 'host', joinedAt: new Date() } },
    { new: true }
  );
};

export const updateUserRoom = async (userId, roomId, role) => {
  return await User.findByIdAndUpdate(
    userId,
    { activeRoom: { roomId, role, joinedAt: new Date() } },
    { new: true }
  );
};

export const clearUserRoom = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $unset: { activeRoom: '' } },
    { new: true }
  );
};
