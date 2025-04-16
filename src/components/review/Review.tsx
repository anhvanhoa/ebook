'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Reply, User } from 'lucide-react';
import { formatTimeToNow } from '@/lib/helper';
import React from 'react';
import { useReviewContext } from '@/provider/review/context';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { likeReview, unlikeReview } from '@/action/review';
import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'sonner';

type ReviewProps = {
    comment: {
        id: string;
        name: string;
        time: string;
        content: string;
        avatar?: string | null;
        isAuthor?: boolean;
        numberOfLikes?: number;
        reply?: {
            id: string;
            name: string;
            content: string;
        };
    };
    isLiked?: boolean;
};
const MaxLength = 200;
export default function Review({ comment, isLiked }: ReviewProps) {
    const { setReview } = useReviewContext();
    const [liked, setLiked] = React.useState({
        isLiked,
        stateLiked: isLiked,
        numberOfLikes: comment.numberOfLikes ?? 0
    });
    const [content, setContent] = React.useState(() => {
        // get 50 first characters of content
        if (comment.content.length > MaxLength) {
            return comment.content.slice(0, MaxLength - 3) + '...';
        }
        return comment.content;
    });
    const handleShowMore = () => {
        if (content.length === MaxLength) {
            setContent(comment.content);
        } else {
            setContent(comment.content.slice(0, MaxLength - 3) + '...');
        }
    };
    const handleReply = () => {
        setReview((prev) => ({
            ...prev,
            reply: {
                id: comment.id,
                name: comment.name,
                content: comment.content
            }
        }));
    };

    const like = useMutation({
        mutationKey: ['like-review', comment.id, liked],
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
            stateLiked: !prev.stateLiked,
            numberOfLikes: prev.stateLiked ? prev.numberOfLikes - 1 : prev.numberOfLikes + 1
        }));
        handleLikeDebounce(comment.id);
    };
    return (
        <div>
            <Card
                id={`review-${comment.id}`}
                className={cn('w-full border-none shadow-none p-0', {
                    'pl-4': comment.reply
                })}
            >
                <CardContent className='p-4'>
                    <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Avatar className='size-9'>
                                    <AvatarImage src={comment.avatar ?? undefined} alt='Bùi Lon Di' />
                                    <AvatarFallback className='flex items-center justify-center'>
                                        <User size={16} className='stroke-gray-500' />
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className='flex items-center gap-1'>
                                        <h3 className='font-medium text-sm space-x-1'>
                                            <span>{comment.name}</span>
                                            {comment.isAuthor && (
                                                <>
                                                    <span>·</span>
                                                    <span className='text-rose-600 text-xs'>Tác giả</span>
                                                </>
                                            )}
                                        </h3>
                                    </div>
                                    <div className='flex items-center gap-2 text-xs text-gray-500'>
                                        <span className='space-x-1 flex items-center'>
                                            <span className='first-letter:capitalize inline-block'>
                                                {formatTimeToNow(comment.time)}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <Button
                                    onClick={handleReply}
                                    variant='ghost'
                                    className='h-8 w-8 rounded-full p-0 cursor-pointer'
                                >
                                    <Reply />
                                </Button>
                                <Button
                                    onClick={handleLike}
                                    variant='ghost'
                                    className='rounded-full p-0 cursor-pointer gap-x-1 h-8'
                                >
                                    <span className='text-gray-500'>{liked.numberOfLikes}</span>
                                    <Heart
                                        className={cn(
                                            'transition dark:fill-gray-100 dark:stroke-gray-100 fill-primary stroke-primary',
                                            {
                                                '!fill-rose-600 !stroke-rose-600': liked.stateLiked
                                            }
                                        )}
                                    />
                                </Button>
                            </div>
                        </div>
                        <p className='text-sm text-gray-700'>
                            {comment.reply && (
                                <span className='text-sm px-1 rounded-md text-rose-500 font-medium'>
                                    @{comment.reply.name}
                                </span>
                            )}
                            {content}
                            <Button
                                onClick={handleShowMore}
                                className='ml-1 px-0 py-0 h-auto text-xs text-blue-500 cursor-pointer'
                                size={'sm'}
                                variant='link'
                            >
                                {MaxLength <= comment.content.length && (
                                    <span>{content.length === MaxLength ? 'Xem thêm' : 'Ẩn bớt'}</span>
                                )}
                            </Button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
