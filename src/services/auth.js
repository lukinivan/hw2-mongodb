import createHttpError from 'http-errors';
import UserCollection from '../db/models/userSchema.js';

export const register = async (payload) => {
  const { email } = payload;

  const user = UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email already exist');
  }

  await UserCollection.create(payload);
};
