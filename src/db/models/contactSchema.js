import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { contactTypeList, min, max } from '../../constants/contacts.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min,
      max,
      required: true,
    },
    phoneNumber: {
      type: String,
      min,
      max,
      required: true,
    },
    email: {
      type: String,
      min,
      max,
    },
    isFavorite: {
      type: Boolean,
      required: false,
    },
    contactType: {
      type: String,
      min,
      max,
      enum: contactTypeList,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const contactParamsList = [
  'name',
  'phoneNumber',
  'email',
  'isFavorite',
  'contactType',
];

contactSchema.post('save', handleSaveError);
contactSchema.pre('findOneAndUpdate', setUpdateSettings);
contactSchema.post('findOneAndUpdate', handleSaveError);

export const ContactsList = model('contacts', contactSchema);
