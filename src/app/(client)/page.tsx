import apiEbook from '@/api/ebook';
import Ebook from '@/components/ebook';
import Heading from '@/components/heading';
export default async function Home() {
    const books = await apiEbook.getEbookHome()
    return (
        <div>
            <Heading />
            <div className='max-w-screen-lg mx-auto'>
                <div className='py-2 grid lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 gap-x-2 gap-y-6 px-4'>
                    {books.map((book) => (
                        <Ebook
                            key={book.id}
                            category={book.categories.map((cat) => cat.category.name).join(', ')}
                            image={book.coverImage}
                            slug={`sd/${book.slug}`}
                            title={book.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
