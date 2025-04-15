'use server';
import { query } from '@/lib/prisma-client';
import { Review } from '@/provider/review/context';
import { ReviewStatus } from '@/types/review';
import { verifyTokenUser } from './account';

export const getReviews = async (
    slug: string,
    record: number = 10,
    page: number = 1,
    status: ReviewStatus = ReviewStatus.ACTIVE
) =>
    query(async (prisma) => {
        const [reviews, total] = await prisma.$transaction([
            prisma.review.findMany({
                include: {
                    user: {
                        include: { author: true }
                    },
                    ebook: true,
                    likes: true
                },
                where: {
                    ebook: {
                        slug
                    },
                    status
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip: (page - 1) * record,
                take: record
            }),
            prisma.review.count({
                where: {
                    ebook: {
                        slug
                    },
                    status
                }
            })
        ]);
        const totalPages = Math.ceil(total / 10);
        return {
            data: reviews,
            total,
            totalPages,
            currentPage: page,
            nextPage: page < totalPages ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null
        };
    });

export const createReview = async (data: Review) => {
    return query(async (prisma) => {
        const user = await verifyTokenUser();
        const review = await prisma.review.create({
            data: {
                ebookId: data.id,
                userId: user.id,
                rating: data.rating,
                comment: data.content,
                status: ReviewStatus.ACTIVE,
                parentId: data.reply?.id
            }
        });
        return review;
    });
};
