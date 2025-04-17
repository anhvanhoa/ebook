import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Gauge, Pause, Repeat, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useAudio } from '@/provider/audio/context';

const Controls = () => {
    const { audio, setAudio } = useAudio();
    return (
        <div className='flex flex-col items-center justify-center gap-2 flex-1'>
            <div className='flex items-center gap-5'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer focus-visible:ring-0'>
                            <Gauge size={18} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>0.25x</DropdownMenuItem>
                        <DropdownMenuItem>0.5x</DropdownMenuItem>
                        <DropdownMenuItem>0.75x</DropdownMenuItem>
                        <DropdownMenuItem>1x</DropdownMenuItem>
                        <DropdownMenuItem>1.25x</DropdownMenuItem>
                        <DropdownMenuItem>1.5x</DropdownMenuItem>
                        <DropdownMenuItem>1.75x</DropdownMenuItem>
                        <DropdownMenuItem>2x</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    <SkipBack size={24} />
                </Button>
                <Button className='border size-10 cursor-pointer !bg-white dark:!bg-primary-foreground text-primary rounded-full p-2 hover:scale-105 transition'>
                    <Pause size={24} className='fill-primary' />
                </Button>
                <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    <SkipForward size={24} />
                </Button>
                <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    <Repeat size={18} />
                </Button>
            </div>

            {/* Progress bar */}
            <div className='flex items-center gap-2 w-full max-w-xl'>
                <span className='text-xs text-neutral-600 w-10 text-right'>{audio.controls.currentTime}</span>
                <div className='flex-1'>
                    <Slider
                        value={[audio.controls.progress]}
                        max={100}
                        step={1}
                        className='cursor-pointer'
                        onValueChange={(value) => setAudio(prev => ({ ...prev, controls: { ...prev.controls, progress: value[0] } }))}
                    />
                </div>
                <span className='text-xs text-neutral-600 w-10'>{audio.controls.duration}</span>
            </div>
        </div>
    );
};

export default Controls;
