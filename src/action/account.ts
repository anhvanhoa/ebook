'use server';
import { verifyToken } from '@/lib/auth';
import { ErrorUnauthorized } from '@/lib/error';
import { query } from '@/lib/prisma-client';
import { newResponse } from '@/lib/response';
import { UserPayload } from '@/types/account';
import { cookies } from 'next/headers';

export const getProfile = async () => {
    const at = (await cookies()).get('at');
    if (!at) throw new ErrorUnauthorized('Vui lòng đăng nhập !');
    return await query(async () => {
        const user = await verifyToken<UserPayload>(at.value);
        const data: UserPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            username: user.username,
            avatar: user.avatar,
            role: user.role,
            createdAt: user.createdAt
        };
        return newResponse(200, 'Lấy thông tin tài khoản thành công !', data);
    });
};

export const verifyTokenUser = async () => {
    const at = (await cookies()).get('at');
    if (!at) throw new ErrorUnauthorized('Vui lòng đăng nhập !');
    const user = await verifyToken<UserPayload>(at.value);
    return user;
};

export const addFavorite = async (id: string) => {
    const user = await verifyTokenUser();
    return await query(async (p) => {
        const data = await p.favorite.create({
            data: {
                ebookId: id,
                userId: user.id
            }
        });
        return newResponse(200, 'Thêm vào yêu thích thành công !', { id: data.id });
    });
};

export const removeFavorite = async (id: string) => {
    const user = await verifyTokenUser();
    return await query(async (p) => {
        await p.favorite.deleteMany({
            where: {
                ebookId: id,
                userId: user.id
            }
        });
        return newResponse(200, 'Xóa khỏi yêu thích thành công !', { id });
    });
};
