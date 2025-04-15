'use client';
import React, { useEffect, useRef } from 'react';
import Review from './Review';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getReviews } from '@/action/review';
import SkeletonReview from './SkeletonReview';

type ReviewProps = {
    slug: string;
};

const Reviews = ({ slug }: ReviewProps) => {
    const loadMoreRef = useRef(null);
    const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['reviews', slug],
        queryFn: ({ pageParam = 1 }) => getReviews(slug, 10, pageParam),
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
    return (
        <div className='py-3'>
            {isLoading && <SkeletonReview />}
            {data?.pages &&
                data.pages.map((d) =>
                    d.data.map((item) => {
                        return (
                            <Review
                                key={item.id}
                                comment={{
                                    content: item!.comment ?? '',
                                    id: item.id,
                                    name: item.user.fullName ?? item.user.email,
                                    avatar: item.user.avatar,
                                    time: item.createdAt.toString(),
                                    isAuthor: item.user.author?.id === item.ebook.authorId,
                                    numberOfLikes: item.likes.length
                                }}
                            />
                        );
                    })
                )}
            <div ref={loadMoreRef}></div>
        </div>
    );
};

export default Reviews;
