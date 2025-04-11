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

export const getEbookByCategory = async (category: string, record: number = 10, page: number = 1) =>
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
                    categories: {
                        some: {
                            category: {
                                slug: category
                            }
                        }
                    }
                },
                skip: (page - 1) * record,
                take: record
            }),
            prisma.ebook.count({
                where: {
                    categories: {
                        some: {
                            category: {
                                slug: category
                            }
                        }
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

export const getEbookPageDetail = async ({ category, slug }: { slug: string; category: string }) =>
    query(async (prisma) => {
        return await prisma.ebook.findFirst({
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                voices: true,
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

export const getEbookSuggestion = async (slugs: string[]) => {
    const ebooks = await query(async (prisma) => {
        const ebooksF = await prisma.favorite.findMany({
            include: {
                ebook: {
                    include: {
                        categories: {
                            include: {
                                category: true
                            }
                        },
                        author: true
                    }
                }
            },
            where: {
                ebook: {
                    slug: { in: slugs }
                }
            },
            orderBy: {
                ebook: {
                    createdAt: 'desc'
                }
            },
            take: 10
        });
        if (ebooksF.length > 0) {
            return ebooksF.map((item) => item.ebook);
        }
        const ebooksL = await prisma.ebookLike.findMany({
            include: {
                ebook: {
                    include: {
                        categories: {
                            include: {
                                category: true
                            }
                        },
                        author: true
                    }
                }
            },
            where: {
                ebook: {
                    slug: { in: slugs }
                }
            },
            orderBy: {
                ebook: {
                    createdAt: 'desc'
                }
            },
            take: 10
        });
        if (ebooksL.length > 0) {
            return ebooksL.map((item) => item.ebook);
        }
        const ebooksF2 = await prisma.favorite.findMany({
            include: {
                ebook: {
                    include: {
                        categories: {
                            include: {
                                category: true
                            }
                        },
                        author: true
                    }
                }
            },
            orderBy: {
                ebook: {
                    createdAt: 'desc'
                }
            },
            take: 10
        });
        if (ebooksF2.length > 0) {
            return ebooksF2.map((item) => item.ebook);
        }
        const ebooksL2 = await prisma.ebookLike.findMany({
            include: {
                ebook: {
                    include: {
                        categories: {
                            include: {
                                category: true
                            }
                        },
                        author: true
                    }
                }
            },
            orderBy: {
                ebook: {
                    createdAt: 'desc'
                }
            },
            take: 10
        });
        if (ebooksL2.length > 0) {
            return ebooksL2.map((item) => item.ebook);
        }
        const ebooksR = await prisma.ebook.findMany({
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                author: true
            },
            where: {
                slug: { in: slugs }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 10
        });
        if (ebooksR.length > 0) {
            return ebooksR;
        }
        const ebooks = await prisma.ebook.findMany({
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                author: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 10
        });
        if (ebooks.length > 0) {
            return ebooks;
        }
        return [];
    });
    return ebooks;
};
