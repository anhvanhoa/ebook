import React from 'react';
import { Button } from '@/components/ui/button';
import { Repeat, Repeat1 } from 'lucide-react';
import { useMediaRemote, useMediaState } from '@vidstack/react';

const ModePlay = () => {
    const loop = useMediaState('loop');
    const remote = useMediaRemote();
    const handleLoop = () => {
        remote.userPrefersLoopChange(!loop);
    };
    return (
        <Button onClick={handleLoop} variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
            {!loop && <Repeat />}
            {loop && <Repeat1 className='stroke-primary' />}
        </Button>
    );
};

export default ModePlay;
