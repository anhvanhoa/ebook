import { cn } from '@/lib/utils';
import React from 'react';
type NumPageProps = {
    totalPages: number;
    pageNumber: number;
    className?: string;
};

const NumPage = ({ pageNumber, totalPages, className }: NumPageProps) => {
    return (
        <div className={cn('flex justify-center sticky bottom-2 z-10', className)}>
            <p className='rounded-3xl text-xs px-2.5 py-1 bg-gray-50/10 backdrop-blur-md'>
                {pageNumber} / {totalPages}
            </p>
        </div>
    );
};

export default NumPage;
