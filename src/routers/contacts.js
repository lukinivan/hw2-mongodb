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
  ctrWrapper(contactsController.upsertContactController),
);

contactRouter.patch(
  '/:id',
  ctrWrapper(contactsController.patchContactController),
);

contactRouter.delete(
  '/:id',
  ctrWrapper(contactsController.deleteContactController),
);

export default contactRouter;
