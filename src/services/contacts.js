import { ContactsList } from '../db/models/Contacts.js';

export const getContacts = () => ContactsList.find();

export const getContactById = (id) => ContactsList.findById(id);
