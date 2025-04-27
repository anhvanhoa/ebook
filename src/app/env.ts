import { z } from 'zod';

const envIntance = z
    .object({
        NEXT_PUBLIC_ARGON_SECRET: z.string(),
        NEXT_PUBLIC_MAIL_HOST: z.string(),
        NEXT_PUBLIC_MAIL_PORT: z.string().transform((val) => parseInt(val, 10)),
        NEXT_PUBLIC_MAIL_USER: z.string(),
        NEXT_PUBLIC_MAIL_PASS: z.string(),
        NEXT_PUBLIC_MAIL_APP: z.string(),
        NEXT_PUBLIC_APP_URL: z.string(),
        NEXT_PUBLIC_KEY: z.string()
    })
    .safeParse(process.env);

if (!envIntance.success) {
    console.error('❌ Invalid environment variables', envIntance.error.format());
    throw new Error('Invalid environment variables');
}
const env = envIntance.data;
export default env;
