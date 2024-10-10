import { ContactsList } from '../db/models/contacts';

export const getContacts = () => ContactsList.find();

export const getContactById = (id) => ContactsList.findById(id);
