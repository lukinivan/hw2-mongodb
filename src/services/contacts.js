import { ContactsList } from '../db/models/contactSchema.js';
import { calcPaginationData } from '../utils/CalcPagionationData.js';

export const getContacts = async ({
  page,
  perPage: limit,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const contactQuery = ContactsList.find();

  if (filter.isFavorite)
    contactQuery.where('isFavorite').equals(filter.isFavorite);
  if (filter.contactType)
    contactQuery.where('contactType').equals(filter.contactType);

  const skip = (page - 1) * limit;
  const data = await contactQuery
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const count = await ContactsList.find().merge(contactQuery).countDocuments();

  const paginationData = calcPaginationData({
    count,
    page,
    perPage: limit,
  });

  return {
    page,
    perPage: limit,
    ...paginationData,
    data,
    count,
  };
};

export const getContactById = (id) => ContactsList.findById(id);

export const addContact = (payload) => ContactsList.create(payload);

export const updateContactById = async (_id, payload, options = {}) => {
  const result = await ContactsList.findOneAndUpdate({ _id }, payload, {
    ...options,
    new: true,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  return {
    data: result.value,
    isNew: Boolean(result.lastErrorObject.upserted),
  };
};

export const deleteContactById = (_id) =>
  ContactsList.findByIdAndDelete({ _id });
