import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeLastContact = async () => {
  const allContacts = await readContacts();
  allContacts.pop();
  await writeContacts(allContacts);
};

removeLastContact();
