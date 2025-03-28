import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Ebook = () => {
    return (
        <div>
            <div className='flex gap-x-4 py-2 border-b px-2'>
                <Link href={''}>
                    <Image
                        alt=''
                        src={'/images/ebook.webp'}
                        width={300}
                        height={500}
                        className='shrink-0 w-16 rounded-sm aspect-[4/6] grayscale hover:grayscale-50 duration-500 transition'
                    />
                </Link>
                <div className='flex flex-col gap-y-1.5 items-start'>
                    <Link href={'/'}>
                        <h3 className='line-clamp-1 text-sm font-semibold hover:underline'>Wow người đọc người đọc</h3>
                    </Link>
                    <p className='text-xs text-gray-500'>Tiểu thuyết</p>
                    <p className='text-xs leading-3 text-blue-500'>37.6k lượt xem</p>
                    <p className='text-xs text-gray-500'>JHOPE</p>
                </div>
            </div>
        </div>
    );
};

export default Ebook;
