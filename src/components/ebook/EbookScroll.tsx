'use client';
import { getEbookByCategory, getEbookHome } from '@/action/ebook';
import Ebook from '@/components/ebook';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';

/**
 *
 * @param type - type of page, home or category default is home, if category, slugCategory is required
 * @param slugCategory - slug of category, if type is category, this is required
 * @returns
 */

type EbookScroll = {
    children: React.ReactNode;
    type?: 'home' | 'category';
    slugCategory?: string;
};

const EbookScroll = ({ children, type = 'home', slugCategory }: EbookScroll) => {
    const loadMoreRef = useRef(null);
    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['ebook', type, slugCategory],
        queryFn: ({ pageParam }) => {
            if (type === 'category' && slugCategory) return getEbookByCategory(slugCategory, 10, pageParam);
            return getEbookHome(10, pageParam);
        },
        getNextPageParam: (r) => r.nextPage,
        initialPageParam: 2,
        enabled: false
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
        <div>
            <div className='py-2 grid lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 gap-x-2 gap-y-6 px-4'>
                {children}
                {data?.pages &&
                    data.pages.map((d) =>
                        d.data.map((item) => {
                            const slug = slugCategory ?? item.categories[0].category.slug;
                            return (
                                <Ebook
                                    key={item.id}
                                    category={item.categories.map((cat) => cat.category.name).join(', ')}
                                    image={item.coverImage}
                                    slug={`${slug}/${item.slug}`}
                                    title={item.title}
                                />
                            );
                        })
                    )}
            </div>
            <div ref={loadMoreRef}></div>
        </div>
    );
};

export default EbookScroll;
