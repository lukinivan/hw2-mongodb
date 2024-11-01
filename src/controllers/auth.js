import createError from 'http-errors';
import { HttpError } from 'http-errors';

import * as authServices from '../services/auth.js';

export const registerController = async (req, res) => {
  await authServices.register(req.body);

  res.status(201).json({
    message: 'user registered successfully',
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    message: 'user logged successfully',
  });
};