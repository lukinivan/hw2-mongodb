import createError from 'http-errors';
import * as authServices from '../services/auth.js';

export const registerController = async (req, res) => {
  await authServices.register(req.body);

  res.status(201).json({
    message: 'user registered successfully',
  });
};
