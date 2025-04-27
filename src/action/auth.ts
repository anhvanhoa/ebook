'use server';
import { verify, hash, argon2id } from 'argon2';
import { ErrorUnauthorized } from '@/lib/error';
import { query } from '@/lib/prisma-client';
import { newResponse } from '@/lib/response';
import env from '@/app/env';
import crypto from 'crypto';
import { sendMail } from '@/lib/mailer';
import otpGenerator from 'otp-generator';
import { generateToken, verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export const loginHandle = async <T>(email: string, password: string) => {
    return await query(async (prisma) => {
        const user = await prisma.user.findFirst({ where: { email, verified: { not: null } } });
        if (!user) throw new ErrorUnauthorized('Tài khoản không chính xác !');
        const isChecked = await verify(user.passwordHash, password, {
            secret: Buffer.from(env.NEXT_PUBLIC_ARGON_SECRET, 'hex')
        });
        if (!isChecked) throw new ErrorUnauthorized('Tài khoản không chính xác !');
        const data = {
            id: user.id,
            email: user.email,
            name: user.fullName,
            avatar: user.avatar,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt
        };
        const t = await generateToken(data, '15d');
        (await cookies()).set('at', t, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 15,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        return newResponse(200, 'Đăng nhập thành công !', {
            id: user.id,
            email: user.email,
            name: user.fullName,
            avatar: user.avatar,
            role: user.role
        } as T);
    });
};

export const registerHandle = async (email: string, password: string) => {
    return await query(async (prisma) => {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (user && user.verified) throw new ErrorUnauthorized('Tài khoản đã tồn tại !');
        const salt = crypto.randomBytes(16);
        const passwordHash = await hash(password, {
            type: argon2id,
            salt,
            secret: Buffer.from(env.NEXT_PUBLIC_ARGON_SECRET, 'hex')
        });

        // Create one time token for email verification
        const otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        if (!user) {
            await prisma.user.create({
                data: {
                    email,
                    passwordHash,
                    username: email.split('@')[0],
                    codeVerification: otp
                }
            });
        } else {
            await prisma.user.update({
                where: { id: user.id },
                data: { passwordHash, codeVerification: otp }
            });
        }
        // Send email to user for verification
        const token = await generateToken({ email, otp }, '15m');
        sendMail('register', [email], {
            email,
            verificationLink: `${env.NEXT_PUBLIC_APP_URL}/verify/${token}?email=${email}`
        });
        return newResponse(200, 'Đăng ký thành công !', null);
    });
};

type PayloadVerify = {
    email: string;
    otp: string;
};

export const verifyHandle = async (token: string) => {
    return await query(async (prisma) => {
        const { email, otp } = await verifyToken<PayloadVerify>(token);
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) throw new ErrorUnauthorized('Tài khoản không chính xác !');
        if (user.codeVerification !== otp) throw new ErrorUnauthorized('Mã xác thực không chính xác !');
        await prisma.user.update({
            where: { email },
            data: { codeVerification: null, verified: new Date() }
        });
        return newResponse(200, 'Xác thực tài khoản thành công !', null);
    });
};

export const refreshTokenHandle = async (email: string) => {
    return await query(async (prisma) => {
        const user = await prisma.user.findFirst({ where: { email, verified: null } });
        if (!user) throw new ErrorUnauthorized('Tài khoản không chính xác !');
        const otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        await prisma.user.update({
            where: { id: user.id },
            data: { codeVerification: otp }
        });
        const newToken = await generateToken({ email, otp }, '15m');
        sendMail('register', [], {
            email,
            verificationLink: `${env.NEXT_PUBLIC_APP_URL}/verify/${newToken}?email=${user.email}`
        });
        return newResponse(200, 'Đã gửi lại yêu cầu xác thực', null);
    });
};
