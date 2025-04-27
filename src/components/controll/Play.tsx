import React from 'react';
import { PlayButton, useMediaState } from '@vidstack/react';
import { Button } from '@/components/ui/button';
import { Loader, Pause, PlayIcon } from 'lucide-react';

const Play = () => {
    const isPaused = useMediaState('paused');
    const isLoading = useMediaState('waiting');
    return (
        <div>
            <PlayButton asChild>
                <Button disabled={isLoading} className='size-8 cursor-pointer !bg-white dark:!bg-primary-foreground text-primary rounded-full p-1 hover:scale-105 transition'>
                    {!isLoading && (
                        <>
                            {isPaused && <PlayIcon size={20} className='fill-primary' />}
                            {!isPaused && <Pause size={20} className='fill-primary' />}
                        </>
                    )}
                    {isLoading && <Loader size={20} className='animate-spin' />}
                </Button>
            </PlayButton>
        </div>
    );
};

export default Play;
