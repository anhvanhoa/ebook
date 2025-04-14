// types/nodemailer-express-handlebars.d.ts
import 'nodemailer/lib/mailer';

declare module 'nodemailer/lib/mailer' {
  interface Options {
    template?: string;
    context?: unknow;
  }
}
