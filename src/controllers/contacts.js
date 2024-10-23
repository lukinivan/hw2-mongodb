import * as contactServices from '../services/contacts.js';
import createError from 'http-errors';
import { contactJoiSchema } from '../validation/contacts.js';

export const getContactsController = async (req, res, next) => {
  const data = await contactServices.getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { id } = req.params;
  const data = await contactServices.getContactById(id);

  if (!data) {
    throw createError(404, `Contacts with id ${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await contactServices.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Contact added successfully',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { data, isNew } = await contactServices.updateContactById(
    id,
    req.body,
    {
      upsert: true,
    },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Contact upsert successfully',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const { data } = await contactServices.updateContactById(id, req.body);

  res.json({
    status: 200,
    message: 'Contact patch successfully',
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.deleteContactById(id);

  if (!data) {
    throw createError(404, `Contacts with id ${id} not found`);
  }

  res.status(204).send();
};
