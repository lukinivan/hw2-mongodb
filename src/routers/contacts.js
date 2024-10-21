import { Router } from 'express';

import * as contactsController from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrWrapper } from '../utils/ctrWrapper.js';

const contactRouter = Router();

contactRouter.get('/', ctrWrapper(contactsController.getContactsController));

contactRouter.get(
  '/:id',
  isValidId,
  ctrWrapper(contactsController.getContactsByIdController),
);

contactRouter.post('/', ctrWrapper(contactsController.addContactController));

contactRouter.put(
  '/:id',
  isValidId,
  ctrWrapper(contactsController.upsertContactController),
);

contactRouter.patch(
  '/:id',
  isValidId,
  ctrWrapper(contactsController.patchContactController),
);

contactRouter.delete(
  '/:id',
  isValidId,
  ctrWrapper(contactsController.deleteContactController),
);

export default contactRouter;
