'use server';
import { query } from '@/lib/prisma-client';
export const getEbookHome = async (record: number = 10, page: number = 1) =>
    query(async (prisma) => {
        const [ebooks, total] = await prisma.$transaction([
            prisma.ebook.findMany({
                include: {
                    categories: {
                        include: {
                            category: true
                        }
                    }
                },
                where: {
                    status: 'published',
                    categories: {
                        some: {}
                    }
                },
                skip: (page - 1) * record,
                take: record
            }),
            prisma.ebook.count({
                where: {
                    status: 'published',
                    categories: {
                        some: {}
                    }
                }
            })
        ]);
        const totalPages = Math.ceil(total / record);
        return {
            data: ebooks,
            currentPage: page,
            total,
            totalPages,
            nextPage: page < totalPages ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null
        };
    });

export const getEbookByCategory = async (category: string) =>
    query(async (prisma) => {
        return await prisma.ebook.findMany({
            include: {
                categories: {
                    include: {
                        category: true
                    }
                }
            },
            where: {
                categories: {
                    some: {
                        category: {
                            slug: category
                        }
                    }
                }
            }
        });
    });

export const getEbookPageDetail = async ({ category, slug }: { slug: string; category: string }) =>
    query(async (prisma) => {
        return await prisma.ebook.findFirst({
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                likes: true,
                follows: true,
                author: true,
                series: {
                    include: {
                        ebook: true
                    }
                }
            },
            where: {
                slug
            }
        });
    });
