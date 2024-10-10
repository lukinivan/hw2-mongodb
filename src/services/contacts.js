import { ContactsList } from '../db/models/contacts.js';

export const getContacts = () => ContactsList.find();

export const getContactById = (id) => ContactsList.findById(id);
