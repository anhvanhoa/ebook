'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
    Heart,
    SkipBack,
    Pause,
    SkipForward,
    Repeat,
    Volume2,
    EllipsisVertical,
    X,
    Gauge,
    ListMusic,
    Play
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime] = useState('03:51');
    const [duration] = useState('03:53');
    const [progress, setProgress] = useState(98);
    const [volume, setVolume] = useState(75);
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    // const formatTime = (seconds: number) => {
    //     const mins = Math.floor(seconds / 60);
    //     const secs = Math.floor(seconds % 60);
    //     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    // };

    return (
        <div className='flex flex-col w-full bg-primary-foreground/20 backdrop-blur-md fixed bottom-0 left-0 z-50 border-t'>
            <Button variant={'secondary'} className='!p-1 h-auto group cursor-pointer absolute right-1 top-1'>
                <X className='!size-3' />
            </Button>
            {/* Player bar */}
            <div className='w-full px-4 py-3'>
                <div className='flex items-center justify-between max-w-screen-2xl mx-auto'>
                    {/* Song info */}
                    <div className='flex items-center gap-4 w-1/4'>
                        <div className='relative h-14 w-14 min-w-14 rounded overflow-hidden'>
                            <Image
                                src='/images/ebook.webp'
                                alt='Album cover'
                                width={56}
                                height={100}
                                className='object-cover'
                            />
                        </div>
                        <div className='flex flex-col min-w-0'>
                            <h3 className='text-sm font-semibold truncate'>Đêm Nay</h3>
                            <p className='text-xs text-neutral-600 truncate'>24k.Right, Hipz, LONA</p>
                        </div>
                        <div className='space-x-1'>
                            <Button variant={'ghost'} className='size-8 !p-1 group cursor-pointer'>
                                <Heart
                                    className={cn(
                                        'transition fill-neutral-600 stroke-neutral-600 group-hover:fill-primary group-hover:stroke-primary'
                                    )}
                                />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant={'ghost'}
                                        className='size-8 !p-1 group cursor-pointer focus-visible:ring-0'
                                    >
                                        <EllipsisVertical
                                            className={cn(
                                                'transition fill-neutral-600 stroke-neutral-600 group-hover:fill-primary group-hover:stroke-primary'
                                            )}
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Thích</DropdownMenuItem>
                                    <DropdownMenuItem>Theo dõi</DropdownMenuItem>
                                    <DropdownMenuItem>Sao chép liên kết</DropdownMenuItem>
                                    <DropdownMenuItem className='text-rose-500'>Báo cáo</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    {/* Player controls */}
                    <div className='flex flex-col items-center justify-center gap-2 flex-1'>
                        <div className='flex items-center gap-5'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant={'ghost'}
                                        className='size-8 !p-1 group cursor-pointer focus-visible:ring-0'
                                    >
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
                            <Button
                                className='border size-10 cursor-pointer !bg-white text-primary rounded-full p-2 hover:scale-105 transition'
                                onClick={handlePlayPause}
                            >
                                {isPlaying ? (
                                    <Pause size={24} className='fill-primary' />
                                ) : (
                                    <Pause size={24} className='fill-primary' />
                                )}
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
                            <span className='text-xs text-neutral-600 w-10 text-right'>{currentTime}</span>
                            <div className='flex-1'>
                                <Slider
                                    value={[progress]}
                                    max={100}
                                    step={1}
                                    className='cursor-pointer'
                                    onValueChange={(value) => setProgress(value[0])}
                                />
                            </div>
                            <span className='text-xs text-neutral-600 w-10'>{duration}</span>
                        </div>
                    </div>
                    {/* Right controls */}
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
                                                <h3 className='text-sm font-medium truncate'>
                                                    Chương 1: Giới thiệu về React
                                                </h3>
                                                <p className='text-xs text-muted-foreground'>Tác giả: John Doe</p>
                                            </div>

                                            <div className='flex items-center gap-4'>
                                                <span className='text-sm text-muted-foreground'>03:51</span>
                                                <Button variant={'secondary'} size={'sm'} className='size-6 flex items-center justify-center rounded-full transition-colors'>
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
                </div>
            </div>
        </div>
    );
}
