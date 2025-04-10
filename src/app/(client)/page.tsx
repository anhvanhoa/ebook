import apiEbook from '@/api/ebook';
import Ebook from '@/components/ebook';
import Heading from '@/components/heading';
import EbookScroll from './_components/EbookScroll';
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
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                    <Ebook
                        category={'Science Fiction'}
                        image={'/images/ebook.webp'}
                        slug={'sci-fi'}
                        title={"The Hitchhiker's Guide to the Galaxy"}
                    />
                </EbookScroll>
            </div>
        </div>
    );
}
