const nodemailer = require("nodemailer");
module.exports = async ({ from, to, subject, text, html}) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, 
            auth: { 
                user: process.env.GMAIL_USER, // generated ethereal user
                pass: process.env.GMAIL_PASS, // generated ethereal password
            },
        });

    let info = await transporter.sendMail({
        from: `SendAnyWhere <${from}>`, 
        to: to, 
        subject: subject, 
        text: text, 
        html: html, 
    });
}