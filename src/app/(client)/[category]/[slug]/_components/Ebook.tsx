import images from '@/asset/images';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
type EbookProps = {
    title: string;
    slug: string;
    category?: string;
    image?: string | null;
    className?: string;
    view?: number;
    author?: string | null;
};
const Ebook = ({ slug, title, image, category, view, author }: EbookProps) => {
    return (
        <div>
            <div className='flex gap-x-4 py-2 border-b px-2'>
                <Link href={slug} className='shrink-0 w-16'>
                    <Image
                        alt={title}
                        src={image ?? images.ebookDefault}
                        width={300}
                        height={500}
                        className='w-full rounded-sm aspect-[4/6] grayscale hover:grayscale-50 duration-500 transition'
                    />
                </Link>
                <div className='flex flex-col gap-y-1.5 items-start'>
                    <Link href={'/'}>
                        <h3 className='line-clamp-1 text-sm font-semibold hover:underline'>{title}</h3>
                    </Link>
                    <p className='text-xs text-gray-500'>{category}</p>
                    <p className='text-xs leading-3 text-blue-500'>{view} lượt xem</p>
                    <p className='text-xs text-gray-500'>{author}</p>
                </div>
            </div>
        </div>
    );
};

export default Ebook;
