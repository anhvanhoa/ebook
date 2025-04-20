'use client';
import React from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { FaPlay } from 'react-icons/fa6';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { BookOpen, Heart, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { EbookFollow, EbookLike, Voice } from '@prisma/client';
import { useUser } from '@/provider/user/context';
import useLikeEbook from '@/hooks/uselikeEbook';
import useFollowEbook from '@/hooks/useFollowEbook';
import useFavoriteEbook from '@/hooks/useFavoriteEbook';
import useVoiceEbook from '@/hooks/useVoiceEbook';

type GroupBtnProps = {
    params: {
        category: string;
        slug: string;
    };
    voices: Voice[];
    idEbook: string;
    likes: EbookLike[];
    follows: EbookFollow[];
    isFavorite?: boolean;
};

const GroupBtn = ({ voices, params, idEbook, likes, follows, isFavorite }: GroupBtnProps) => {
    const user = useUser();
    const { handleLike, stateLike } = useLikeEbook(
        idEbook,
        likes.some((l) => l.userId === user.id)
    );
    const { handleFollow, stateFollow } = useFollowEbook(
        idEbook,
        follows.some((f) => f.userId === user.id)
    );
    const { favorite, handleFavorite } = useFavoriteEbook(idEbook, isFavorite);
    const handleVoice = useVoiceEbook(params.slug);
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
                            <FaPlay />
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
                <BiSolidLike className={cn({ 'fill-rose-500': stateLike })} />
            </Button>
            <Button
                onClick={handleFollow}
                variant={'secondary'}
                className='text-xs sm:text-sm size-9 rounded-full cursor-pointer'
            >
                <UserPlus className={cn('fill-primary', { 'stroke-rose-500 fill-rose-500': stateFollow })} />
            </Button>
            <Button
                onClick={handleFavorite}
                variant={'secondary'}
                className='text-xs sm:text-sm size-9 rounded-full cursor-pointer'
            >
                <Heart className={cn('fill-primary', { 'stroke-rose-500 fill-rose-500': favorite.stateFavorite })} />
            </Button>
        </div>
    );
};

export default GroupBtn;
