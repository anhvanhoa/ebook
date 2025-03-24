import Ebook from '@/components/ebook';
import Heading from '@/components/heading';

export default function Home() {
    return (
        <div>
            <Heading />
            <div className='max-w-screen-lg mx-auto'>
                <div className='py-2 grid grid-cols-5 gap-x-2 gap-y-6'>
                    <Ebook
                        category='Tiểu thuyết'
                        image='/images/ebook.webp'
                        slug='novel/ebook'
                        title='Wow người đọc nhiều sách vở'
                    />
                    <Ebook category='Tiểu thuyết' image='/images/ebook.webp' slug='novel/ebook' title='Wow người đọc' />
                    <Ebook category='Tiểu thuyết' image='/images/ebook.webp' slug='novel/ebook' title='Wow người đọc' />
                    <Ebook category='Tiểu thuyết' image='/images/ebook.webp' slug='novel/ebook' title='Wow người đọc' />
                    <Ebook category='Tiểu thuyết' image='/images/ebook.webp' slug='novel/ebook' title='Wow người đọc' />
                    <Ebook category='Tiểu thuyết' image='/images/ebook.webp' slug='novel/ebook' title='Wow người đọc' />
                    <Ebook category='Tiểu thuyết' image='/images/ebook.webp' slug='novel/ebook' title='Wow người đọc' />
                    <Ebook category='Tiểu thuyết' image='/images/ebook.webp' slug='novel/ebook' title='Wow người đọc' />
                    <Ebook category='Tiểu thuyết' image='/images/ebook.webp' slug='novel/ebook' title='Wow người đọc' />
                    <Ebook category='Tiểu thuyết' image='/images/ebook.webp' slug='novel/ebook' title='Wow người đọc' />
                </div>
            </div>
        </div>
    );
}
