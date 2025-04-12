import env from '@/app/env';
import { SignJWT, JWTPayload, jwtVerify } from 'jose';

export const generateToken = async <T>(data?: { [key: string]: any } & T, expiration: string = '2h') => {
    const secret = new TextEncoder().encode(env.NEXT_PUBLIC_KEY);
    const signJWT = new SignJWT(data)
        .setAudience(env.NEXT_PUBLIC_APP_URL)
        .setExpirationTime(expiration)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(secret);
    return await signJWT;
};

export const verifyToken = async <T extends JWTPayload>(token: string) => {
    const secret = new TextEncoder().encode(env.NEXT_PUBLIC_KEY);
    const { payload } = await jwtVerify(token, secret, {
        audience: env.NEXT_PUBLIC_APP_URL,
        algorithms: ['HS256']
    });
    return payload as T;
};
