const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const formData = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Booking Request" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `New Booking: ${formData.name}`,
    text: `
      Booking Request:

      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Date: ${formData.date}
      Time: ${formData.time}
      Hours: ${formData.hours}
      Service: ${formData.service}
      Message: ${formData.message || 'N/A'}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: 'Email sent' };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: 'Email failed to send' };
  }
};
