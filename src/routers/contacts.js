import { Router } from 'express';

import * as contactsController from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

import { ctrWrapper } from '../utils/ctrWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import {
  contactJoiSchema,
  contactJoiUpdateSchema,
} from '../validation/contacts.js';

const contactRouter = Router();

contactRouter.get('/', ctrWrapper(contactsController.getContactsController));

contactRouter.get(
  '/:id',
  isValidId,
  ctrWrapper(contactsController.getContactsByIdController),
);

contactRouter.post(
  '/',
  validateBody(contactJoiSchema),
  ctrWrapper(contactsController.addContactController),
);

contactRouter.put(
  '/:id',
  isValidId,
  validateBody(contactJoiSchema),
  ctrWrapper(contactsController.upsertContactController),
);

contactRouter.patch(
  '/:id',
  isValidId,
  // validateBody(contactJoiUpdateSchema),
  ctrWrapper(contactsController.patchContactController),
);

contactRouter.delete(
  '/:id',
  isValidId,
  ctrWrapper(contactsController.deleteContactController),
);

export default contactRouter;
