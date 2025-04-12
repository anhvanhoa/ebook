import { z } from 'zod';

const envIntance = z
    .object({
        ARGON_SECRET: z.string(),
        MAIL_HOST: z.string(),
        MAIL_PORT: z.string().transform((val) => parseInt(val, 10)),
        MAIL_USER: z.string(),
        MAIL_PASS: z.string(),
        MAIL_APP: z.string(),
        NEXT_PUBLIC_APP_URL: z.string(),
        NEXT_PUBLIC_KEY: z.string(),
    })
    .safeParse(process.env);

if (!envIntance.success) {
    console.error('❌ Invalid environment variables', envIntance.error.format());
    throw new Error('Invalid environment variables');
}
const env = envIntance.data;
export default env;
