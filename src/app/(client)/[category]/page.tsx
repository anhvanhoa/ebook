import apiCategory from '@/api/category';
import apiEbook from '@/api/ebook';
import Ebook, { EbookScroll } from '@/components/ebook';
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
                <EbookScroll type='category' slugCategory={cate.slug}>
                    {ebooks.data.map((book) => (
                        <Ebook
                            key={book.id}
                            category={book.categories.map((cat) => cat.category.name).join(', ')}
                            image={book.coverImage}
                            slug={`${cate.slug}/${book.slug}`}
                            title={book.title}
                        />
                    ))}
                </EbookScroll>
            </div>
        </div>
    );
}
