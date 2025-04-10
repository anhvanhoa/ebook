'use client';
import { getEbookHome } from '@/action/ebook';
import Ebook from '@/components/ebook';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';

type EbookScroll = {
    children: React.ReactNode;
};

const EbookScroll = ({ children }: EbookScroll) => {
    const loadMoreRef = useRef(null);
    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['ebook'],
        queryFn: ({ pageParam }) => getEbookHome(10, pageParam),
        getNextPageParam: (r) => r.nextPage,
        initialPageParam: 1,
        enabled: false
    });
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            console.log(entries[0].isIntersecting && hasNextPage);
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, data]);
    return (
        <div>
            <div className='py-2 grid lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 gap-x-2 gap-y-6 px-4'>
                {children}
                {data?.pages &&
                    data.pages.map((d) =>
                        d.data.map((item) => (
                            <Ebook
                                key={item.id}
                                category={'Science Fiction'}
                                image={'/images/ebook.webp'}
                                slug={'sci-fi'}
                                title={"The Hitchhiker's Guide to the Galaxy"}
                            />
                        ))
                    )}
            </div>
            <div ref={loadMoreRef}></div>
        </div>
    );
};

export default EbookScroll;
