'use server';
import { query } from '@/lib/prisma-client';
import { Review as ReviewContext } from '@/provider/review/context';
import { ReviewStatus } from '@/types/review';
import { verifyTokenUser } from './account';
import { buildSortedComments } from '@/lib/helper';
import { newResponse } from '@/lib/response';
import { sendMail } from '@/lib/mailer';

import { Prisma } from '@prisma/client';

type ReviewWithIncludes = Prisma.ReviewGetPayload<typeof reviewWithIncludes>;
const reviewWithIncludes = Prisma.validator<Prisma.ReviewDefaultArgs>()({
    include: {
        user: { include: { author: true } },
        ebook: true,
        likes: true,
        parent: { include: { user: true } }
    }
});

export const getReviews = async (
    slug: string,
    record: number = 10,
    page: number = 1,
    ids: string[] = [],
    excludeIds: string[] = [],
    status: ReviewStatus = ReviewStatus.ACTIVE
) =>
    query(async (prisma) => {
        const whereBase = {
            ebook: { slug },
            status
        };

        // 1. Lấy các review theo id nếu có
        let reviewInIds: ReviewWithIncludes[] = [];
        if (ids.length > 0) {
            reviewInIds = await prisma.review.findMany({
                where: {
                    ...whereBase,
                    id: { in: ids }
                },
                include: reviewWithIncludes.include
            });
        }

        // ✅ Gộp excludeIds từ tham số và các id đã lấy
        const combinedExcludeIds = [...new Set([...excludeIds, ...reviewInIds.map((r) => r.id)])];

        const remainingToTake = record - reviewInIds.length;

        // 2. Lấy các review khác để đủ số lượng
        let reviewOthers: typeof reviewInIds = [];
        if (remainingToTake > 0) {
            reviewOthers = await prisma.review.findMany({
                where: {
                    ...whereBase,
                    id: { notIn: combinedExcludeIds }
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * record,
                take: remainingToTake,
                include: {
                    user: { include: { author: true } },
                    ebook: true,
                    likes: true,
                    parent: { include: { user: true } }
                }
            });
        }

        const allReviews = [...reviewInIds, ...reviewOthers];
        const total = await prisma.review.count({ where: whereBase });
        const totalPages = Math.ceil(total / record);

        return {
            data: buildSortedComments(allReviews),
            total,
            totalPages,
            currentPage: page,
            nextPage: page < totalPages ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null
        };
    });

export const createReview = async (data: ReviewContext) => {
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
            },
            include: {
                user: {
                    include: { author: true }
                },
                ebook: {
                    include: { author: { include: { user: true } }, categories: { include: { category: true } } }
                },
                parent: {
                    include: {
                        user: true
                    }
                },
                likes: true
            }
        });
        const emailAuthor = review.ebook.author?.user.email;
        const category = review.ebook.categories[0];
        const dataMail = {
            commenterName: review.user.fullName || review.user.username,
            bookTitle: review.ebook.title,
            commentContent: review.comment,
            commentLink: `${process.env.NEXT_PUBLIC_APP_URL}/${category.category.slug}/${review.ebook.slug}?review=${review.id}`
        };
        if (emailAuthor && review.ebook.author?.user.email !== user.email)
            sendMail('review', [emailAuthor], {
                recipientName: review.ebook.author?.penName || 'Bạn',
                titleMail: 'Bạn đã nhận được một bình luận mới từ',
                ...dataMail
            });
        if (data.reply) {
            const emailReply = await prisma.review.findFirst({
                where: { id: data.reply.id },
                include: {
                    user: true
                }
            });
            if (emailReply) {
                sendMail('prompt', [emailReply.user.email], {
                    recipientName: emailReply.user.fullName || emailReply.user.username,
                    titleMail: 'Bạn được nhắc trong một bình luận từ',
                    ...dataMail
                });
            }
        }
        return review;
    });
};

export const likeReview = async (id: string) => {
    return await query(async (prisma) => {
        const user = await verifyTokenUser();
        const review = await prisma.reviewLike.create({
            data: {
                reviewId: id,
                userId: user.id
            }
        });
        return newResponse(200, 'Like thành công', { id: review.id });
    });
};

export const unlikeReview = async (id: string) => {
    return await query(async (prisma) => {
        const user = await verifyTokenUser();
        await prisma.reviewLike.deleteMany({
            where: {
                reviewId: id,
                userId: user.id
            }
        });
        return newResponse(200, 'Hủy thành công', { id });
    });
};
