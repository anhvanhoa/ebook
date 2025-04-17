import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { EllipsisVertical, Heart } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAudio } from '@/provider/audio/context';

const InfoEbook = () => {
    const { audio } = useAudio();
    if (!audio.ebook) return <div className='flex items-center gap-4 w-1/4'></div>;
    return (
        <div className='flex items-center gap-4 w-1/4'>
            <div className='relative h-14 w-14 min-w-14 rounded overflow-hidden'>
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
                    {audio.ebook.author.penName} - {audio.ebook.categories.map((item) => item.name).join(', ')}
                </p>
            </div>
            <div className='space-x-1'>
                <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    <Heart className='transition fill-primary' />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer focus-visible:ring-0'>
                            <EllipsisVertical className='transition' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Thích</DropdownMenuItem>
                        <DropdownMenuItem>Theo dõi</DropdownMenuItem>
                        <DropdownMenuItem>Sao chép liên kết</DropdownMenuItem>
                        <DropdownMenuItem className='text-rose-500'>Báo cáo</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default InfoEbook;
