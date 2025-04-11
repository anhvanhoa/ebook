import { getCategoryBySlug } from '@/action/category';
const apiCategory = { getCategoryBySlug };
export default apiCategory;
export type ApiCategory = typeof apiCategory;
export type ApiCategoryKey = keyof ApiCategory;
