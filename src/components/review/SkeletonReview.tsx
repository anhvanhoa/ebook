import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type SkeletonReviewProps = {
    quantity?: number;
};

const SkeletonReview = ({ quantity = 5 }: SkeletonReviewProps) => {
    const skeletons = Array.from({ length: quantity }, (_, index) => (
        <div key={index} className='p-3'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                    <Skeleton className='size-9 rounded-full' />
                    <div className='space-y-2'>
                        <Skeleton className='h-3 w-[200px]' />
                        <div className='flex items-center space-x-1'>
                            <Skeleton className='h-3 w-[60px]' />
                            <Skeleton className='h-3 w-[80px]' />
                        </div>
                    </div>
                </div>
                <div className='flex items-center space-x-2'>
                    <Skeleton className='size-6 rounded-full' />
                    <Skeleton className='size-6 rounded-full' />
                </div>
            </div>
            <div className='pt-2'>
                <Skeleton className='h-3 w-full mt-2' />
                <Skeleton className='h-3 w-3/5 mt-2' />
                <Skeleton className='h-3 w-10/12 mt-2' />
            </div>
        </div>
    ));

    return <div className='space-y-3'>
        {skeletons}
    </div>;
};

export default SkeletonReview;
