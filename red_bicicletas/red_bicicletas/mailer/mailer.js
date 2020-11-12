const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_SECRET)

let mailConfig;


if(process.env.NODE_ENV === 'production'){
    mailConfig= {MAIL:sgMail,type:'production'};
}else{
    if(process.env.NODE_ENV === 'staging'){
        mailConfig= {MAIL:sgMail,type:'production'};
    }else{
        mailConfig = {
            MAIL:nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                        port: 587,
                        auth: {
                            user: process.env.ETHEREAL_USER,
                            pass: process.env.ETHEREAL_PASS
                        }
                }),
            type:'local'
        }

    }
}



module.exports = nodemailer.createTransport{mailConfig};
