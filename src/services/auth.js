import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import UserCollection from '../db/models/userSchema.js';
import sessionCollection from '../db/models/sessionSchema.js';

import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/usersConst.js';

export const register = async (payload) => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email already exist');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await UserCollection.create({ ...payload, password: hashPassword });
};

export const login = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.find({ email });

  if (!user) throw createHttpError(401, 'Email or password invalid');

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw createHttpError(401, 'Email or password invalid');

  await sessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await sessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifeTime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
  });
};
