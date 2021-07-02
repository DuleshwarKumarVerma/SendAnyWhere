const nodemailer = require("nodemailer");
module.exports = async ({ from, to, subject, text, html}) => {
        let transporter = nodemailer.createTransport({
            host: process.env.GMAIL_host,
            port: process.env.GMAIL_port,
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