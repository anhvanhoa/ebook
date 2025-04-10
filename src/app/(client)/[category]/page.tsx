import apiCategory from '@/api/category';
import apiEbook from '@/api/ebook';
import Ebook from '@/components/ebook';
import Heading from '@/components/heading';
import { notFound } from 'next/navigation';

type EbookPageProps = {
    params: Promise<{ category: string }>;
};

export default async function EbooksPage({ params }: EbookPageProps) {
    const { category } = await params;
    const cate = await apiCategory.getCategoryBySlug(category);
    if (!cate) notFound();
    const ebooks = await apiEbook.getEbookByCategory(cate.slug);
    return (
        <div>
            <Heading title={cate.name} />
            <div className='max-w-screen-lg mx-auto'>
                <div className='py-2 grid grid-cols-5 gap-x-2 gap-y-6'>
                    {ebooks.map((book) => (
                        <Ebook
                            key={book.id}
                            category={book.categories.map((cat) => cat.category.name).join(', ')}
                            image={book.coverImage}
                            slug={`${cate.slug}/${book.slug}`}
                            title={book.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
