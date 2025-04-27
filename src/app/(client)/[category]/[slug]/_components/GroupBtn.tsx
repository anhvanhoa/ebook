'use client';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { BookOpen, Heart, PlayIcon, ThumbsUp, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Voice } from '@prisma/client';
import useLikeEbook from '@/hooks/uselikeEbook';
import useFollowEbook from '@/hooks/useFollowEbook';
import useFavoriteEbook from '@/hooks/useFavoriteEbook';
import useVoiceEbook from '@/hooks/useVoiceEbook';
import { EbookInterface } from '@/provider/audio/context';

type GroupBtnProps = {
    params: {
        category: string;
        slug: string;
    };
    voices: Voice[];
    isFavorite?: boolean;
    isLike?: boolean;
    isFollow?: boolean;
    ebook: EbookInterface;
};

const GroupBtn = ({ voices, params, isFollow, isLike, isFavorite, ebook }: GroupBtnProps) => {
    const { handleLike, like } = useLikeEbook(ebook.id, isLike);
    const { handleFollow, follow } = useFollowEbook(ebook.id, isFollow);
    const { favorite, handleFavorite } = useFavoriteEbook(ebook.id, isFavorite);
    const handleVoice = useVoiceEbook(ebook);
    return (
        <div className='mt-5 flex gap-x-3'>
            <Link href={`/${params.category}/${params.slug}/read`}>
                <Button
                    variant={'outline'}
                    className='text-xs sm:text-sm border-pink-600 bg-pink-600 hover:bg-pink-600/90 hover:text-white px-8 rounded-full cursor-pointer'
                >
                    <BookOpen />
                    Đọc ngay
                </Button>
            </Link>
            {voices.length !== 0 && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={'secondary'}
                            className='text-xs sm:text-sm size-9 rounded-full cursor-pointer focus-visible:ring-0'
                        >
                            <PlayIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='rounded-3xl'>
                        {voices.map((voice) => (
                            <DropdownMenuItem
                                onClick={() => handleVoice(voice)}
                                className='text-xs rounded-3xl py-1'
                                key={voice.id}
                            >
                                {voice.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            <Button
                onClick={handleLike}
                variant={'secondary'}
                className='text-xs sm:text-sm size-9 rounded-full cursor-pointer'
            >
                <ThumbsUp className={cn({ 'stroke-rose-500': like.stateLiked })} />
            </Button>
            <Button
                onClick={handleFollow}
                variant={'secondary'}
                className='text-xs sm:text-sm size-9 rounded-full cursor-pointer'
            >
                <UserPlus className={cn({ 'stroke-rose-500': follow.stateFollowed })} />
            </Button>
            <Button
                onClick={handleFavorite}
                variant={'secondary'}
                className='text-xs sm:text-sm size-9 rounded-full cursor-pointer'
            >
                <Heart className={cn('fill-current', { 'stroke-rose-500 fill-rose-500': favorite.stateFavorite })} />
            </Button>
        </div>
    );
};

export default GroupBtn;
