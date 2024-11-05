import { Router } from 'express';

import * as contactsController from '../controllers/contacts.js';

import { parsePaginationParams } from '../middlewares/parsePaginationParams.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

import { ctrWrapper } from '../utils/ctrWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { parseSortParamsDecorator } from '../utils/parseSortParamsDecorator.js';

import { contactParamsList } from '../db/models/contactSchema.js';

import {
  contactJoiSchema,
  contactJoiUpdateSchema,
} from '../validation/contacts.js';

const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get(
  '/',
  parsePaginationParams,
  parseSortParamsDecorator(contactParamsList),
  ctrWrapper(contactsController.getContactsController),
);

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
  validateBody(contactJoiUpdateSchema),
  ctrWrapper(contactsController.patchContactController),
);

contactRouter.delete(
  '/:id',
  isValidId,
  ctrWrapper(contactsController.deleteContactController),
);

export default contactRouter;
