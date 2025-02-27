import nodemailer from 'nodemailer';

export const sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Password Reset',
    text: `Click here to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`
  };

  await transporter.sendMail(mailOptions);
};
