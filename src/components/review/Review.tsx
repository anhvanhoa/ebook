'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reply, User } from 'lucide-react';
import Like from './Like';
import { formatTimeToNow } from '@/lib/helper';
import React from 'react';
import { useReviewContext } from '@/provider/review/context';

type ReviewProps = {
    comment: {
        id: string;
        name: string;
        time: string;
        content: string;
        avatar?: string | null;
        isAuthor?: boolean;
        numberOfLikes?: number;
    };
};
const MaxLength = 200;
export default function Review({ comment }: ReviewProps) {
    const { setReview } = useReviewContext();
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
    return (
        <Card className='w-full border-none shadow-none p-0'>
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
                                    <span>
                                        {/* <Reply /> */}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2 text-xs text-gray-500'>
                                    <span className='space-x-1'>
                                        <span className='first-letter:capitalize inline-block'>
                                            {formatTimeToNow(comment.time)}
                                        </span>
                                        {!!comment.numberOfLikes && comment.numberOfLikes > 0 && (
                                            <>
                                                <span>-</span>
                                                <span className='text-gray-400'>
                                                    {comment.numberOfLikes} người thấy hữu ích
                                                </span>
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button
                                onClick={handleReply}
                                variant='ghost'
                                className='h-8 w-8 rounded-full p-0 cursor-pointer'
                            >
                                <Reply />
                            </Button>
                            <Like />
                        </div>
                    </div>
                    <p className='text-sm text-gray-700'>
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
    );
}
