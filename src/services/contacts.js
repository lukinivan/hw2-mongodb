import { ContactsList } from '../db/models/contactSchema.js';

export const getContacts = () => ContactsList.find();

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
