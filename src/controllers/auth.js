import createHttpError from 'http-errors';
import * as authServices from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  await authServices.register(req.body);

  res.status(201).json({
    message: 'user registered successfully',
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'user logged successfully',
    data: { accessToken: session.accessToken },
  });
};

export const refreshSessionController = async (req, res) => {
  const session = await authServices.refreshSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await authServices.logout(sessionId);
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    return res.status(204).send();
  }

  throw createHttpError(401, 'Session not found');
};

export const requestResetEmailController = async (req, res) => {
  const { email } = req.body;
  await authServices.requestResetToken(email);

  res.json({
    message: 'Reset password was successfully sent',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await authServices.resetPassword(req.body);

  res.json({
    message: 'Password was successfully reset',
    status: 200,
    data: {},
  });
};
