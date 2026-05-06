require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({    // transpoter comunicate with smtp servers
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"bank system" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to Bank System";
  const text = `Hello ${name},

Thank you for registering with Bank System. Your account has been successfully created.

You can now log in and start using our services securely.

Best regards,
Bank System Team`;

  const html = `
    <h2>Welcome to Bank System</h2>
    <p>Hello <strong>${name}</strong>,</p>
    <p>Thank you for registering with <b>Bank System</b>. Your account has been successfully created.</p>
    <p>You can now log in and start using our services securely.</p>
    <br/>
    <p>Best regards,<br/>Bank System Team</p>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Bank System" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject,
      text,
      html,
    });

    console.log("Registration email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending registration email:", error);
  }
}




module.exports = {
    sendRegistrationEmail
}
//module.exports = transporter;