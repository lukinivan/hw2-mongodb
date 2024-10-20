import { ContactsList } from '../db/models/contactSchema.js';

export const getContacts = () => ContactsList.find();

export const getContactById = (id) => ContactsList.findById(id);
