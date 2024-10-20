import { Router } from 'express';

import * as contactsController from '../controllers/contactsController.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrWrapper } from '../utils/ctrWrapper.js';

const contactRouter = Router();

contactRouter.get('/', ctrWrapper(contactsController.getContactsController));

contactRouter.get(
  '/:id',
  isValidId,
  ctrWrapper(contactsController.getContactsByIdController),
);

export default contactRouter;
