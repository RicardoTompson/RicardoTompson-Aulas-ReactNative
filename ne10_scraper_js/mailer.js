const nodemailer = require('nodemailer');

async function sendEmail(subject, body) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"NE10 Scraper" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject,
    text: body,
  });
}

module.exports = { sendEmail };