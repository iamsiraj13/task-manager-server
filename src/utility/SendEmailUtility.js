const nodemailer = require("nodemailer");

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sirazclan@gmail.com",
      pass: "sss123sss",
    },
  });

  let mailOptions = {
    from: "Task Manager Sirajul <sirazclan@gmail.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = SendEmailUtility;
