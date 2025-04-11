'use server';
import { query } from '@/lib/prisma-client';

export const getCategoryBySlug = async (slug: string) =>
    query(async (prisma) => {
        return await prisma.category.findFirst({
            where: {
                slug
            }
        });
    });
