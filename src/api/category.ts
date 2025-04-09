import { query } from '@/lib/prisma-client';

const getCategoryBySlug = async (slug: string) =>
    query(async (prisma) => {
        return await prisma.category.findFirst({
            where: {
                slug
            }
        });
    });
const apiCategory = { getCategoryBySlug };
export default apiCategory;
export type ApiCategory = typeof apiCategory;
export type ApiCategoryKey = keyof ApiCategory;
