const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(arr_email, subject, htmlBody) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "smart.home.app.key@gmail.com", 
      pass: "Smarthome123!", 
    },
  });

  let emails = "";
  arr_email.forEach(item => {
    emails += item.email + ",";
  })
  emails = emails.slice(0, -1) // remove last character from emails
  
  let mailOptions = {
    from: '"Smart Home App 👻" <smart.home.app.key@gmail.com>', // sender address
    to: emails,
    subject: subject, // Subject line
    html: htmlBody
  };

  await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendEmail