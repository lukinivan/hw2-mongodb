import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavorite: {
      type: Boolean,
      required: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsList = model('contacts', contactSchema);
