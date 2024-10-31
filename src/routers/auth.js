import { Router } from 'express';

import * as authControllers from '../controllers/auth.js';

import { ctrWrapper } from '../utils/ctrWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import { userRegisterSchema, userLoginSchema } from '../validation/users.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrWrapper(authControllers.registerController),
);

export default authRouter;
