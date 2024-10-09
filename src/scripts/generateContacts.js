import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

const generateContacts = async (number) => {
  const allContacts = await readContacts();
  const newContact = Array(number)
    .fill(0)
    .map(() => createFakeContact());
  await writeContacts([...allContacts, ...newContact]);
};

generateContacts(5);
