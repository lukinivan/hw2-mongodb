import Joi from 'joi';
import { contactTypeList, numberPattern } from '../constants/contacts.js';

export const contactJoiSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(numberPattern)
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': 'should be a number',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(3),
  isFavorite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...contactTypeList),
});

export const contactJoiUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string()
    .pattern(numberPattern)
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': 'should be a number',
    }),
  email: Joi.string()
    .email({ minDomainSegments: 3, tlds: { allow: false } })
    .min(3)
    .max(20),
  isFavorite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...contactTypeList),
});
