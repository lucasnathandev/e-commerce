import nodemailer from "nodemailer";

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const createTransport = async function () {
  return nodemailer.createTransport({
    host: "smtp.umbler.com",
    port: 587,
    auth: {
      user,
      pass,
    },
  });
};

export const sendAccountInvadeWarning = async function (email: string) {
  const transporter = await createTransport();
  const emailSent = await transporter.sendMail({
    from: user,
    to: email,
    replyTo: user,
    subject: "Possível tentativa de invasão da sua conta!",
    html: "./mailTemplates/invadeSuspect.ts",
  });

  return emailSent;
};

export const sendOffers = async function (email: string) {
  const transporter = await createTransport();

  const emailSent = await transporter.sendMail({
    from: user,
    to: email,
    replyTo: "no-reply",
    html: "./mailTemplates/sendOffers.ts",
  });

  return emailSent;
};
