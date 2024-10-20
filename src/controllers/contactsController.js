import * as contactServices from '../services/contacts.js';
import createError from 'http-errors';

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
