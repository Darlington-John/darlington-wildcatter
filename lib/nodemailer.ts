import nodemailer from "nodemailer";
const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
  tls: {
    rejectUnauthorized: false, // Ignore SSL validation (use cautiously)
  },
  debug: true,
  logger: true,
});

export const mailOptions = {
  from: email,
};
