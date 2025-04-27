import Image from 'next/image';
import React from 'react';
import { useAudio } from '@/provider/audio/context';

const InfoEbook = () => {
    const { audio } = useAudio();
    if (!audio.ebook) return <div className='flex items-center gap-4 w-1/4'></div>;
    return (
        <div className='flex items-center gap-4 w-1/4'>
            <div className='relative size-10 rounded overflow-hidden'>
                {audio.ebook?.coverImage && (
                    <Image
                        src={audio.ebook.coverImage}
                        alt={audio.ebook.title}
                        width={56}
                        height={100}
                        className='object-cover'
                    />
                )}
            </div>
            <div className='flex flex-col min-w-0 flex-1'>
                <h3 className='text-sm font-semibold truncate'>{audio.ebook.title}</h3>
                <p className='text-xs text-neutral-600 truncate'>
                    {audio.ebook.author && <span>{audio.ebook.author.penName} - </span>}
                    <span>{audio.ebook.categories.map((item) => item.name).join(', ')}</span>
                </p>
            </div>
        </div>
    );
};

export default InfoEbook;
