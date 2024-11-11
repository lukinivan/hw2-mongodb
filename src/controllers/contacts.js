import * as contactServices from '../services/contacts.js';
import createError from 'http-errors';

import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

const enable_cloudinary = env('ENABLE_CLOUDINARY') === 'true';

export const getContactsController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { page, perPage, sortBy, sortOrder } = req.query;

  const filter = parseFilterParams(req.query);
  filter.userId = userId;

  const data = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.getContact({ _id: id, userId });

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
  const { _id: userId } = req.user;

  const data = await contactServices.addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Contact added successfully',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { data, isNew } = await contactServices.updateContact(
    { _id: id, userId },
    { ...req.body, userId },
    { upsert: true },
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
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (enable_cloudinary) {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await contactServices.updateContact(
    { _id: id, userId },
    { ...req.body, userId, photo: photoUrl },
  );

  if (!result) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found or could not be updated',
    });
  }

  const { data } = result;

  res.json({
    status: 200,
    message: 'Contact patch successfully',
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.deleteContact({ _id: id, userId });

  if (!data) {
    throw createError(404, `Contacts with id ${id} not found`);
  }

  res.status(204).send();
};
