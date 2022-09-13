const nodemailer = require("nodemailer");

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sirazgun@gmail.com",
      pass: "sirajul@123",
    },
  });

  let mailOptions = {
    from: "Task Manager Sirajul <sirazgun@gmail.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;
