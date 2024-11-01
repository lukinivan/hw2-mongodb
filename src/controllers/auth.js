import createError from 'http-errors';
import * as authServices from '../services/auth.js';

export const registerController = async (req, res) => {
  await authServices.register(req.body);

  res.status(201).json({
    message: 'user registered successfully',
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);
  console.log(session);

  //   res.status(201).json({
  //     message: 'user logged successfully',
  //   });
};
