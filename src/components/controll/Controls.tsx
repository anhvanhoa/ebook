'use client';
import { Button } from '@/components/ui/button';
import { SkipBack, SkipForward } from 'lucide-react';
import Play from './Play';
import SliderTime from './SliderTime';
import Speed from './Speed';
import ModePlay from './ModePlay';

const Controls = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-2 flex-1'>
            <div className='flex items-center gap-5'>
                <Speed />
                <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    <SkipBack size={24} />
                </Button>
                <Play />
                <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    <SkipForward size={24} />
                </Button>
                <ModePlay />
            </div>
            <SliderTime />
        </div>
    );
};

export default Controls;
