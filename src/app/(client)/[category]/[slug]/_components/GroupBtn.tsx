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
import { useMutation } from '@tanstack/react-query';
import { followEbook, likeEbook, unfollowEbook, unlikeEbook } from '@/action/ebook';
import { cn } from '@/lib/utils';
import { useDebouncedCallback } from 'use-debounce';
import { EbookFollow, EbookLike, Voice } from '@prisma/client';
import { useUser } from '@/provider/user/context';
import { useRouter } from 'next/navigation';

type GroupBtnProps = {
    params: {
        category: string;
        slug: string;
    };
    voices: Voice[];
    idEbook: string;
    likes: EbookLike[];
    follows: EbookFollow[];
};

const GroupBtn = ({ voices, params, idEbook, likes, follows }: GroupBtnProps) => {
    const user = useUser();
    const router = useRouter();
    const [group, setGroup] = React.useState(() => {
        const liked = likes.some((l) => l.userId === user.id);
        const followed = follows.some((f) => f.userId === user.id);
        return {
            liked: liked,
            stateLike: liked,
            followed: followed,
            stateFollow: followed,
            favorite: false,
            stateFavorite: false
        };
    });
    const likeBook = useMutation({
        mutationFn: (id: string) => {
            if (group.liked) return unlikeEbook(id);
            return likeEbook(id);
        },
        onSuccess: () => {
            if (group.liked) setGroup((prev) => ({ ...prev, liked: false }));
            if (!group.liked) setGroup((prev) => ({ ...prev, liked: true }));
            router.refresh();
        },
        onError: (e) => console.error(e)
    });

    const followBook = useMutation({
        mutationFn: (id: string) => {
            if (group.followed) return unfollowEbook(id);
            return followEbook(id);
        },
        onSuccess: () => {
            if (group.followed) setGroup((prev) => ({ ...prev, followed: false }));
            if (!group.followed) setGroup((prev) => ({ ...prev, followed: true }));
            router.refresh();
        },
        onError: (e) => console.error(e)
    });

    const likeDebounce = useDebouncedCallback((id: string) => {
        if (group.stateLike !== group.liked) likeBook.mutate(id);
    }, 500);

    const followDebounce = useDebouncedCallback((id: string) => {
        if (group.stateFollow !== group.followed) followBook.mutate(id);
    }, 500);

    const handleLike = () => {
        setGroup((prev) => ({ ...prev, stateLike: !prev.stateLike }));
        likeDebounce(idEbook);
    };

    const handleFollow = () => {
        setGroup((prev) => ({ ...prev, stateFollow: !prev.stateFollow }));
        followDebounce(idEbook);
    };

    const handleFavorite = () => {
        setGroup((prev) => ({ ...prev, favorite: !prev.favorite }));
        // likeDebounce(idEbook);
    };

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
                            <DropdownMenuItem className='text-xs rounded-3xl py-1' key={voice.id}>
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
                <BiSolidLike className={cn({ 'fill-rose-500': group.stateLike })} />
            </Button>
            <Button
                onClick={handleFollow}
                variant={'secondary'}
                className='text-xs sm:text-sm size-9 rounded-full cursor-pointer'
            >
                <UserPlus className={cn('fill-primary', { 'stroke-rose-500 fill-rose-500': group.stateFollow })} />
            </Button>
            <Button
                onClick={handleFavorite}
                variant={'secondary'}
                className='text-xs sm:text-sm size-9 rounded-full cursor-pointer'
            >
                <Heart className={cn('fill-primary', { 'stroke-rose-500 fill-rose-500': group.favorite })} />
            </Button>
        </div>
    );
};

export default GroupBtn;
