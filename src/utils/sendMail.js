import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';

const transporter = nodemailer.createTransport({
  //   host: env(SMTP.SMTP_HOST),
  //   port: Number(env(SMTP.SMTP_PORT)),
  service: 'gmail',
  auth: {
    user: env(SMTP.SMTP_FROM),
    pass: env(SMTP.SMTP_GMAIL_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
