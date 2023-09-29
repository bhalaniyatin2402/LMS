import nodemailer from "nodemailer";
import AppError from "./error.utils.js";

async function mail(email, subject, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const options = {
    from: "kano24022@gmail.com",
    to: email,
    subject,
    html: message,
  };

  await transporter.sendMail(options, (err, info) => {
    if (err) {
      return next(new AppError("mail error: " + err, 400));
    }
  });
}

export const registerMail = async (email) => {
  let subject = "🎉 Registration Complete! Welcome to Corsify";
  let message = "<h1>welcome to coursify</h1>";

  mail(email, subject, message);
};

export const forgotPasswordMail = async (email, link) => {
  let subject = "Password reset requested";
  let message = link;

  mail(email, subject, message);
};
