import { getEbookByCategory, getEbookHome, getEbookPageDetail } from '@/action/ebook';

const apiEbook = { getEbookHome, getEbookByCategory, getEbookPageDetail };
export default apiEbook;
export type ApiEbook = typeof apiEbook;
export type ApiEbookKey = keyof ApiEbook;
