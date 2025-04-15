'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type LikeProps = {
    isLiked?: boolean;
};

const Like = ({ isLiked }: LikeProps) => {
    const [liked, setLiked] = React.useState(isLiked || false);
    const handleLike = () => {
        setLiked((prev) => !prev);
    };
    return (
        <Button onClick={handleLike} variant='ghost' className='h-8 w-8 rounded-full p-0 cursor-pointer'>
            <Heart
                className={cn('transition dark:fill-gray-100 dark:stroke-gray-100 fill-primary stroke-primary',{
                    '!fill-rose-600 !stroke-rose-600': liked
                })}
            />
        </Button>
    );
};

export default Like;
