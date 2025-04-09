import { query } from '@/lib/prisma-client';

const getEbookHome = () =>
    query(async (prisma) => {
        return await prisma.ebook.findMany({
            include: {
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
    });

const getEbookByCategory = (category: string) =>
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

const getEbookPageDetail = ({ category, slug }: { slug: string; category: string }) =>
    query(async (prisma) => {
        return await prisma.ebook.findFirst({
            include: {
                categories: {
                    include: {
                        category: true
                    }
                }
            },
            where: {
                slug
            }
        });
    });

const apiEbook = { getEbookHome, getEbookByCategory, getEbookPageDetail };
export default apiEbook;
export type ApiEbook = typeof apiEbook;
export type ApiEbookKey = keyof ApiEbook;
