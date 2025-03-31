import { cn } from '@/lib/utils';
import React from 'react';

type HeadingProps = {
    title?: string;
    className?: string;
};

const Heading = ({ title = 'Ebook Story', className }: HeadingProps) => {
    return (
        <div className='py-12 xs:py-14 sm:py-16 md:py-20'>
            <h1 className={cn('text-3xl sm:text-4xl md:text-5xl font-bold text-center', className)}>
                <span className='text-gray-700 dark:text-inherit'>{title}</span>
            </h1>
        </div>
    );
};

export default Heading;
