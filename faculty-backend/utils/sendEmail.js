import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
console.log("MAIL_USER:", process.env.MAIL_USER);

transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ Connection error:", error);
  } else {
    console.log("✅ Server is ready to take messages");
  }
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

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to", to);
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
};
