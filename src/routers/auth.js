import { Router } from 'express';

import * as authControllers from '../controllers/auth.js';

import { ctrWrapper } from '../utils/ctrWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import { userRegisterSchema, userLoginSchema } from '../validation/users.js';
import {
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrWrapper(authControllers.registerController),
);

authRouter.post(
  '/login',
  validateBody(userLoginSchema),
  ctrWrapper(authControllers.loginController),
);

authRouter.post(
  '/refresh',
  ctrWrapper(authControllers.refreshSessionController),
);

authRouter.post('/logout', ctrWrapper(authControllers.logoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrWrapper(authControllers.requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrWrapper(authControllers.resetPasswordController),
);

export default authRouter;
