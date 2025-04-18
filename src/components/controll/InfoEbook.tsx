import Image from 'next/image';
import React from 'react';
import { EllipsisVertical, Heart, Info, Share, ThumbsUp, UserPlus } from 'lucide-react';
import { useAudio } from '@/provider/audio/context';
import dynamic from 'next/dynamic';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import useFavoriteEbook from '@/hooks/useFavoriteEbook';
const Button = dynamic(() => import('@/components/ui/button').then((mod) => mod.Button), {
    ssr: false
});

type KeyMenu = 'like' | 'follow' | 'share' | 'report';

const menus = [
    {
        name: 'Thích',
        icon: ThumbsUp,
        key: 'like'
    },
    {
        name: 'Theo dõi',
        icon: UserPlus,
        key: 'follow'
    },
    {
        name: 'Chia sẻ',
        icon: Share,
        key: 'share'
    },
    {
        name: 'Báo cáo',
        icon: Info,
        key: 'report'
    }
];

const InfoEbook = () => {
    const { audio } = useAudio();
    const { handleFavorite } = useFavoriteEbook(audio.ebook?.id ?? '');

    const handleMenu = (key: KeyMenu) => () => {
        switch (key) {
            case 'like':
                handleFavorite();
        }
    };
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
                    {audio.ebook.author && <span>{audio.ebook.author.penName} - </span>}
                    <span>{audio.ebook.categories.map((item) => item.name).join(', ')}</span>
                </p>
            </div>
            <div className='space-x-1'>
                <Button onClick={handleFavorite} variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    <Heart
                        className={cn('fill-primary', { 'fill-rose-500 stroke-rose-500': audio.ebook.isFavorite })}
                    />
                </Button>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer focus-visible:ring-0'>
                            <EllipsisVertical className='transition fill-primary' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='rounded-xl w-32 p-1'>
                        {menus.map((menu) => (
                            <div
                                onClick={handleMenu(menu.key as KeyMenu)}
                                key={menu.key}
                                className='flex items-center gap-2 rounded-lg cursor-pointer px-3 py-1.5 text-xs hover:bg-muted'
                            >
                                {<menu.icon className='size-4' />}
                                <p>{menu.name}</p>
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default InfoEbook;
