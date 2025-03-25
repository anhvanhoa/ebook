import { cn } from '@/lib/utils';
import React from 'react';

type LoadingProps = {
    className?: string;
};

const Loading = ({ className }: LoadingProps) => {
    return <div className={cn('h-[calc(100vh-2.75rem)] bg-gray-200 animate-pulse', className)}></div>;
};

export default Loading;
