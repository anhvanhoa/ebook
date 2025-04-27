import env from '@/app/env';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { Attachment } from 'nodemailer/lib/mailer';
import path from 'path';

const transporter = nodemailer.createTransport({
    host: env.NEXT_PUBLIC_MAIL_HOST,
    port: env.NEXT_PUBLIC_MAIL_PORT,
    secure: false,
    auth: {
        user: env.NEXT_PUBLIC_MAIL_USER,
        pass: env.NEXT_PUBLIC_MAIL_PASS
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

export const sendMail = async (template: TemplateMailType, tos: string[], data?: unknown, attach?: Attachment[]) => {
    const tpl = TemplateMail[template];
    if (!tpl) throw new Error('Template not found!');
    return await transporter.sendMail({
        from: `"${env.NEXT_PUBLIC_MAIL_APP}" <${env.NEXT_PUBLIC_MAIL_USER}>`,
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
    },
    review: {
        subject: 'Có bình luận mới trên Ebook của bạn',
        template: 'review'
    },
    prompt: {
        subject: 'Nhắc tên trên Ebook', // + nameEbook,
        template: 'review'
    }
};

type TemplateMailType = keyof typeof TemplateMail;
