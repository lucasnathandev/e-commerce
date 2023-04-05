import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

type MailBodyObject = {
  text?: Mail.Options["text"];
  html?: Mail.Options["html"];
};

const host = process.env.MAIL_HOST;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;
const mailApiKey = process.env.MAIL_API_KEY;

const createTransport = async function () {
  return nodemailer.createTransport({
    host,
    port: 587,
    auth: {
      user,
      pass,
    },
  });
};

export const sendAccountInvadeWarning = async function (
  email: string,
  body: MailBodyObject,
  apiKey: string
) {
  if (apiKey !== mailApiKey) {
    return new Error("Cannot send e-mail to " + email);
  }
  const transporter = await createTransport();
  const emailSent = await transporter.sendMail({
    from: user,
    to: email,
    replyTo: user,
    subject: "Possível tentativa de invasão da sua conta!",
    html: body?.html,
    text: !body.html ? body.text : undefined,
  });

  return emailSent;
};

export const sendOffers = async function (
  email: string,
  body: MailBodyObject,
  apiKey: string
) {
  if (apiKey !== mailApiKey) {
    return new Error("Cannot send e-mail to " + email);
  }
  const transporter = await createTransport();

  const emailSent = await transporter.sendMail({
    from: user,
    to: email,
    replyTo: "no-reply",
    subject: "Ofertas da semana",
    html: body?.html,
    text: !body.html ? body.text : undefined,
  });

  return emailSent;
};
