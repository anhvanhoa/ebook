'use client';
import React, { useEffect, useRef } from 'react';
import Review from './Review';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getReviews } from '@/action/review';
import SkeletonReview from './SkeletonReview';
import { useUser } from '@/provider/user/context';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

type ReviewProps = {
    slug: string;
};

const Reviews = ({ slug }: ReviewProps) => {
    const searchParam = useSearchParams();
    const id = searchParam.get('review');
    const loadMoreRef = useRef(null);
    const user = useUser();
    const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['reviews', slug],
        queryFn: ({ pageParam = 1 }) => {
            const includeIds = id && pageParam === 1 ? [id] : undefined;
            const excludeIds = id && pageParam !== 1 ? [id] : undefined;
            return getReviews(slug, 10, pageParam, includeIds, excludeIds);
        },
        getNextPageParam: (r) => r.nextPage,
        initialPageParam: 1
    });
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const next = !data ? true : hasNextPage;
            if (entries[0].isIntersecting && next) {
                fetchNextPage();
            }
        });
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, data]);
    const reply = <T extends Record<string, string>>(id: string | null, r: T) => {
        if (id === null) return;
        return {
            id,
            ...r
        };
    };
    return (
        <div className='py-3'>
            {isLoading && <SkeletonReview />}
            {data?.pages &&
                data.pages.map((d) =>
                    d.data.map((item) => {
                        return (
                            <Review
                                key={item.id}
                                className={cn({
                                    'bg-blue-50': id === item.id
                                })}
                                comment={{
                                    content: item!.comment ?? '',
                                    id: item.id,
                                    name: item.user.fullName ?? item.user.username,
                                    avatar: item.user.avatar,
                                    time: item.createdAt.toString(),
                                    isAuthor: item.user.author?.id === item.ebook.authorId,
                                    numberOfLikes: item.likes.length,
                                    reply: reply(item.parentId, {
                                        content: item.parent?.comment ?? '',
                                        name: item.parent?.user.fullName ?? item.parent?.user.username ?? ''
                                    })
                                }}
                                isLiked={item.likes.some((like) => like.userId === user.id)}
                            />
                        );
                    })
                )}
            <div ref={loadMoreRef}></div>
        </div>
    );
};

export default Reviews;
