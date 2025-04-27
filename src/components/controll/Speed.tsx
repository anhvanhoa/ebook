import React from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Gauge } from 'lucide-react';
import { useMediaPlayer, useMediaStore } from '@vidstack/react';
import dynamic from 'next/dynamic';
const Button = dynamic(() => import('@/components/ui/button').then((mod) => mod.Button), {
    ssr: false,
    loading: () => (
        <div className='w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center'>
            <Gauge size={16} />
        </div>
    )
});
const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const Speed = () => {
    const player = useMediaPlayer();
    const handleSpeed = (speed: number) => () => {
        if (player) {
            player.playbackRate = speed;
        }
    };
    const { playbackRate } = useMediaStore();
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={'ghost'} className='active:text-primary size-8 !p-1 group cursor-pointer focus-visible:ring-0'>
                    <Gauge />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='rounded-xl w-16 p-1'>
                {speeds.map((speed) => (
                    <p
                        className='rounded-lg cursor-pointer text-center px-3 py-1.5 text-xs hover:bg-muted'
                        key={speed}
                        onClick={handleSpeed(speed)}
                    >
                        <span className={cn({ 'font-medium text-blue-500': playbackRate === speed })}>{speed}</span>
                    </p>
                ))}
            </PopoverContent>
        </Popover>
    );
};

export default Speed;
