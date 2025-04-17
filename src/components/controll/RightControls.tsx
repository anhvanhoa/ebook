import React from 'react';
import { useState } from 'react';
import { Volume2, ListMusic, Play } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const RightControls = () => {
    const [volume, setVolume] = useState(75);

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
                <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                    <Volume2 />
                </Button>
                <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    className='cursor-pointer'
                    onValueChange={(value) => setVolume(value[0])}
                />
            </div>
        </div>
    );
};

export default RightControls;
