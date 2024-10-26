import { ContactsList } from '../db/models/contactSchema.js';
import { calcPaginationData } from '../utils/CalcPagionationData.js';

export const getContacts = async ({ page, perPage: limit }) => {
  const skip = (page - 1) * limit;
  const data = await ContactsList.find().skip(skip).limit(limit);
  const count = await ContactsList.find().countDocuments();

  const paginationData = calcPaginationData({ count, page, perPage: limit });

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
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  return {
    data: result.value,
    isNew: Boolean(result.lastErrorObject.upserted),
  };
};

export const deleteContactById = (_id) =>
  ContactsList.findByIdAndDelete({ _id });
