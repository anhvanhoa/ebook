'use client';
import { X } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSetAudio } from '@/provider/audio/context';

const Close = () => {
    const setAudio = useSetAudio();
    const handleClose = () => setAudio((prev) => ({ ...prev, isShowPlayer: false }));
    return (
        <Button
            onClick={handleClose}
            variant={'secondary'}
            className='!p-1 h-auto group cursor-pointer absolute right-1 top-1'
        >
            <X className='!size-3' />
        </Button>
    );
};

export default Close;
