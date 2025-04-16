'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { likeReview, unlikeReview } from '@/action/review';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';

type LikeProps = {
    isLiked?: boolean;
    id: string;
};

const Like = ({ isLiked, id }: LikeProps) => {
    const [liked, setLiked] = React.useState({
        isLiked,
        stateLiked: isLiked
    });
    const like = useMutation({
        mutationKey: ['like-review', id, liked],
        mutationFn: (id: string) => {
            if (liked.isLiked) return unlikeReview(id);
            return likeReview(id);
        },
        onSuccess: () => {
            setLiked((prev) => ({
                ...prev,
                isLiked: !prev.isLiked
            }));
        },
        onError: (error) => toast(error.message)
    });
    const handleLikeDebounce = useDebouncedCallback((id: string) => {
        if (liked.isLiked !== liked.stateLiked) like.mutate(id);
    }, 700);
    const handleLike = () => {
        setLiked((prev) => ({
            ...prev,
            stateLiked: !prev.stateLiked
        }));
        handleLikeDebounce(id);
    };
    return (
        <Button onClick={handleLike} variant='ghost' className='h-8 w-8 rounded-full p-0 cursor-pointer'>
            <Heart
                className={cn('transition dark:fill-gray-100 dark:stroke-gray-100 fill-primary stroke-primary', {
                    '!fill-rose-600 !stroke-rose-600': liked.stateLiked
                })}
            />
        </Button>
    );
};

export default Like;
