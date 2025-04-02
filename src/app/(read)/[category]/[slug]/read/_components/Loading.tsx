import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import React from 'react';

type LoadingProps = {
    className?: string;
    style?: React.CSSProperties;
};

const Loading = ({ className, style }: LoadingProps) => {
    return (
        <div
            style={style}
            className={cn(
                'h-[calc(100vh-2.75rem)] bg-primary-foreground flex justify-center items-center',
                className
            )}
        >
            <Loader className='animate-spin'  />
        </div>
    );
};

export default Loading;
