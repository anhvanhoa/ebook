import { getEbookByCategory, getEbookHome, getEbookPageDetail, getEbookSuggestion } from '@/action/ebook';

const apiEbook = { getEbookHome, getEbookByCategory, getEbookPageDetail, getEbookSuggestion };
export default apiEbook;
export type ApiEbook = typeof apiEbook;
export type ApiEbookKey = keyof ApiEbook;
