import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailer = (mail:string, subject:string, text:string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_MAIL,
      pass: process.env.AUTH_PASS
    }
  });

  const mailOptions = {
    from: "hms-dev@gmail.com",
    to: mail,
    subject: subject,
    text: text
  };

  transporter
    .sendMail(mailOptions)
    .then(() => console.log("mail sent successfully"))
    .catch((error) => console.log(error));
};

export default mailer;