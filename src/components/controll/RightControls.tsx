import React, { useMemo } from 'react';
import { Volume2, ListMusic, Play, Volume1, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useMediaRemote, useMediaState } from '@vidstack/react';
import dynamic from 'next/dynamic';
const Button = dynamic(() => import('@/components/ui/button').then((mod) => mod.Button), {
    ssr: false
});

const RightControls = () => {
    const volume = useMediaState('volume');
    const muted = useMediaState('muted');
    const canSetVolume = useMediaState('canSetVolume');
    const remote = useMediaRemote();
    const handleVolumeChange = (value: number) => {
        if (remote) {
            remote.changeVolume(value / 100);
        }
    };
    const vol = useMemo(() => volume * 100, [volume]);
    const handleVolume = () => {
        if (remote) {
            remote.toggleMuted();
        }
    };
    return (
        <div className='flex items-center gap-3 w-1/4 justify-end'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                        <ListMusic />
                    </Button>
                </SheetTrigger>
                <SheetContent className='sm:max-w-lg gap-0'>
                    <SheetHeader>
                        <SheetTitle>Danh sách phát</SheetTitle>
                        <SheetDescription className='sr-only'></SheetDescription>
                    </SheetHeader>
                    <div className='max-w-lg w-full mx-auto px-2'>
                        <div className='space-y-2'>
                            <div className='flex items-center gap-4 py-2 px-3 rounded-lg transition-colors hover:bg-muted'>
                                <div className='w-6 text-sm text-center'>1</div>
                                <div className='flex-1 min-w-0'>
                                    <h3 className='text-sm font-medium truncate'>Chương 1: Giới thiệu về React</h3>
                                    <p className='text-xs text-muted-foreground'>Tác giả: John Doe</p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <span className='text-sm text-muted-foreground'>03:51</span>
                                    <Button
                                        variant={'secondary'}
                                        size={'sm'}
                                        className='size-6 flex items-center justify-center rounded-full transition-colors'
                                    >
                                        <Play className='size-3' />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <div className='flex items-center gap-2 w-32'>
                <Button onClick={handleVolume} variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    {!muted && vol >= 50 && <Volume2 />}
                    {!muted && vol < 50 && vol >= 1 && <Volume1 />}
                    {(muted || vol === 0) && <VolumeX />}
                </Button>
                <Slider
                    disabled={!canSetVolume}
                    value={[vol]}
                    step={1}
                    className='cursor-pointer'
                    onValueChange={(value) => handleVolumeChange(value[0])}
                />
            </div>
        </div>
    );
};

export default RightControls;
