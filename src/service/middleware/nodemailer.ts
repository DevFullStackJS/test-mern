import * as nodemailer from 'nodemailer';

import { configs } from '../../data/constants/configs';

export type MailOptions = {
  to: string;
  subject: string;
  body: string;
};

const { emailUser, emailPassword } = configs;

export const sendMail = (options: MailOptions): Promise<any> => {
  const { to, subject, body } = options;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
  const mailOptions = {
    to,
    subject,
    from: emailUser,
    html: body,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};
