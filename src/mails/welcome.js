
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL);

const sendMail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'mohamed.a.ramadan23@gmail.com',
        subject: `Welcome ${name} to blue Task`,
        text: 'Blue',
        html: '<strong>thanks for joined to our task</strong>',
    });
}

//s
module.exports = sendMail;