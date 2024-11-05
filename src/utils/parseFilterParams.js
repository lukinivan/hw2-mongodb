import { contactTypeList } from '../constants/contacts.js';

const parseContactType = (type) => {
  if (typeof type !== 'string') return;

  return contactTypeList.includes(type) && type;
};

// const parseNumber = (number) => {
//   if (typeof number !== 'string') return;
//   const parsedNumber = parseInt(number);
//   if (Number.isNaN(parsedNumber)) return;
//   return parsedNumber;
// };

export const parseFilterParams = (query) => {
  const { isFavorite, contactType } = query;

  const parsedContactType = parseContactType(contactType);

  return {
    isFavorite,
    contactType: parsedContactType,
  };
};
