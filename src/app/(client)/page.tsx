import apiEbook from '@/api/ebook';
import Ebook, { EbookScroll } from '@/components/ebook';
import Heading from '@/components/heading';
export default async function Home() {
    const books = await apiEbook.getEbookHome();
    return (
        <div>
            <Heading />
            <div className='max-w-screen-lg mx-auto'>
                <EbookScroll>
                    {books.data.map((book) => {
                        const slug = book.categories[0].category.slug;
                        return (
                            <Ebook
                                key={book.id}
                                category={book.categories.map((cat) => cat.category.name).join(', ')}
                                image={book.coverImage}
                                slug={`${slug}/${book.slug}`}
                                title={book.title}
                            />
                        );
                    })}
                </EbookScroll>
            </div>
        </div>
    );
}
