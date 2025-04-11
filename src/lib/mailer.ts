import env from '@/app/env';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { Attachment } from 'nodemailer/lib/mailer';
import path from 'path';

const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: false,
    auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS
    }
});

// Cấu hình Handlebars
transporter.use(
    'compile',
    hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: path.resolve('./src/mail/layout'),
            partialsDir: path.resolve('./src/mail/partial')
        },
        viewPath: path.resolve('./src/mail'),
        extName: '.hbs'
    })
);

export const sendMail = async (template: TemplateMailType, tos: string[], data?: any, attach?: Attachment[]) => {
    const tpl = TemplateMail[template];
    if (!tpl) throw new Error('Template not found!');
    await transporter.sendMail({
        from: `"${env.MAIL_APP}" <${env.MAIL_USER}>`,
        subject: tpl.subject,
        to: tos,
        template: tpl.template,
        context: data,
        attachments: attach
    });
};

const TemplateMail = {
    register: {
        subject: 'Xác thực tài khoản Ebook App',
        template: 'register'
    }
};

type TemplateMailType = keyof typeof TemplateMail;
