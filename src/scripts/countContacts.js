import { readContacts } from '../utils/readContacts.js';

export const countContacts = async () => (await readContacts()).length;
console.log(await countContacts());
