'use client';
import { createReview } from '@/action/review';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Review, useReviewContext } from '@/provider/review/context';
import { useUser } from '@/provider/user/context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const Comment = () => {
    const commentRef = React.useRef<HTMLTextAreaElement>(null);
    const user = useUser();
    const { review, setReview } = useReviewContext();
    const queryClient = useQueryClient();
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview((prev) => ({ ...prev, content: e.target.value }));
    };
    const handleCanel = () => {
        setReview((prev) => ({ ...prev, reply: undefined }));
    };
    const reviewQ = useMutation({
        mutationFn: async (data: Review) => createReview(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['reviews', review.slug],
                exact: true
            });
            setReview((prev) => ({ ...prev, content: '', reply: undefined }));
        },
        onError: (error) => {
            toast(error.message);
        }
    });
    const handleSubmit = () => {
        if (review.content.trim() === '') return;
        reviewQ.mutate(review);
    };
    useEffect(() => {
        if (commentRef.current && review.reply) {
            // scroll to commentRef
            commentRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            // set focus to commentRef
            commentRef.current.focus();
            // set selection to end of commentRef
            commentRef.current.setSelectionRange(0, commentRef.current.value.length);
        }
    }, [review.reply]);
    return (
        <>
            {user.isLoggedIn && (
                <div className='p-3'>
                    {review.reply && (
                        <p className='bg-gray-100/50 text-sm rounded-md p-1.5 mb-2 flex items-center gap-x-1'>
                            <span className='shrink-0 text-sm px-1 rounded-md text-rose-500 font-medium'>
                                @{review.reply?.name}
                            </span>
                            <span className='line-clamp-1'>{review.reply?.content}</span>
                            <Button
                                className='h-auto !p-0.5 hover:text-red-600 cursor-pointer'
                                variant='ghost'
                                onClick={handleCanel}
                            >
                                <X />
                            </Button>
                        </p>
                    )}
                    <div>
                        <div className='w-full relative'>
                            <Textarea
                                ref={commentRef}
                                onChange={handleChange}
                                value={review.content}
                                placeholder='Nhập bình luận của bạn'
                                className='w-full resize-none'
                            />
                        </div>
                        <div className='mt-2 flex items-center justify-end gap-x-2'>
                            <Button
                                disabled={reviewQ.isPending || review.content.trim() === ''}
                                onClick={handleSubmit}
                                type='submit'
                                size='sm'
                                className='cursor-pointer'
                            >
                                {reviewQ.isPending && <Loader className='ml-2 h-4 w-4 animate-spin' />}
                                {reviewQ.isPending ? 'Bình luận...' : 'Bình luận'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Comment;
