import nodemailer, {} from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_SERVER,
    secure: false,
    auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,   
        }, 
    tls : { rejectUnauthorized: false}
})

export const verify = async (transporter: any) => {
    const connection = await transporter.verify();
    if(connection) {
        console.log("Server is ready to take our message");
    }
};