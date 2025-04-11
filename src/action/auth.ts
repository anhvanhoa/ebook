'use server';
import { verify, hash, argon2id } from 'argon2';
import { ErrorUnauthorized } from '@/lib/error';
import { query } from '@/lib/prisma-client';
import { newResponse } from '@/lib/response';
import env from '@/app/env';
import crypto from 'crypto';
import { sendMail } from '@/lib/mailer';
import otpGenerator from 'otp-generator';

export const loginHandle = async (email: string, password: string) => {
    return await query(async (prisma) => {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!user) throw new ErrorUnauthorized('Tài khoản không chính xác !');
        const isChecked = await verify(user.passwordHash, password, {
            secret: Buffer.from(env.ARGON_SECRET, 'hex')
        });
        if (!isChecked) throw new ErrorUnauthorized('Tài khoản không chính xác !');
        return newResponse(200, 'Đăng nhập thành công !', {
            id: user.id,
            email: user.email,
            name: user.fullName,
            avatar: user.avatar,
            role: user.role
        });
    });
};

export const registerHandle = async (email: string, password: string) => {
    return await query(async (prisma) => {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (user) throw new ErrorUnauthorized('Tài khoản đã tồn tại !');
        const salt = crypto.randomBytes(16);
        const passwordHash = await hash(password, {
            type: argon2id,
            salt,
            secret: Buffer.from(env.ARGON_SECRET, 'hex')
        });
        const newUser = await prisma.user.create({
            data: {
                email,
                passwordHash,
                username: email.split('@')[0]
            }
        });

        // Create one time token for email verification
        const otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });

        sendMail('register', [email], {
            name: newUser.fullName,
            email: newUser.email,
            confirmationLink: `${env.NEXT_PUBLIC_APP_URL}/verify/${newUser.id}`
        });
        return newResponse(200, 'Đăng ký thành công !', {
            id: newUser.id,
            email: newUser.email,
            name: newUser.fullName,
            avatar: newUser.avatar,
            role: newUser.role
        });
    });
};
