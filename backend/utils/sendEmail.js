const nodemailer = require("nodemailer");
//options {email,message,subject,html}
const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service:'gmail',
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: process.env.EMAIL_PORT == 465
    });

    const mailOptions = {
      from: `Streetwear Support <${process.env.EMAIL_FROM}>`,
      to: options.email,
      subject: options.subject,
      html: options.html
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Email Error: ", error);
  }
};

module.exports = sendEmail;
