import { Router } from 'express';

import { ctrWrapper } from '../utils/ctrWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import { userRegisterSchema, userLoginSchema } from '../validation/users.js';

const authRouter = Router();

authRouter.post('/register', validateBody(userRegisterSchema));

export default authRouter;
