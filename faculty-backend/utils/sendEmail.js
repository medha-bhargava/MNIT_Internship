import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendStudentCredentials = async (to, userId, password) => {
  const mailOptions = {
    from: `"ProfileX" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Your Student Login Credentials',
    html: `
      <h1>Welcome to Faculty Portal 🎓</h1>
      <h2>🎉 You've been approved!</h2>
      <p><strong>User ID (Roll No):</strong> ${userId}</p>
      <p><strong>Temporary Password:</strong> ${password}</p>
      <p>Please log in and update your password after first login.</p>
      <br />
      <p style="color: grey; font-size: 0.9rem;">Sent by ProfileX Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
