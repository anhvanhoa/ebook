import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Ebook = () => {
    return (
        <div>
            <div className='flex gap-x-4 py-2 border-b px-2'>
                <Link href={''}>
                    <Image alt='' src={'/images/ebook.webp'} width={300} height={500} className='w-16 rounded-sm aspect-[4/6]' />
                </Link>
                <div className='flex flex-col gap-y-1.5 items-start'>
                    {/* <TypeFilm typeFilm={film.type} /> */}
                    <Link href={'/'}>
                        <h3 className='text-sm font-semibold hover:text-[#055398]'>
                        Wow người đọc
                        </h3>
                    </Link>
                    <p className='text-xs text-gray-500'>
                        Tiểu thuyết
                    </p>
                    <div className='flex items-end text-xs'>
                        <Star color='#FBBF24' fill='#FBBF24' size={14} />
                        <p className='pl-1 leading-3'>3</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ebook;
