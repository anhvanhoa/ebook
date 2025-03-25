'use client';
import { Button } from '@/components/ui/button';
import {
    Bookmark,
    ChevronLeft,
    ChevronRight,
    CirclePlay,
    House,
    SkipBack,
    SkipForward,
    SlidersVertical,
    Type,
    Undo,
    Volume2,
    ZoomIn,
    ZoomOut
} from 'lucide-react';
import React from 'react';
import PdfViewer from './_components/PDF';
import { useRouter } from 'next/navigation';

type EbookContextPage = {
    state: { width: number; height: number; pageNumber: number; scale: number; fileUrl?: string };
    setState: (state: EbookContextPage['state']) => void;
};

const stateDefault = {
    width: 500,
    height: 800,
    pageNumber: 1,
    scale: 1,
    fileUrl: '/e.pdf'
};

export const EbookContext = React.createContext<EbookContextPage>({
    state: stateDefault,
    setState: () => {}
});

const EbookPage = () => {
    const [state, setState] = React.useState<EbookContextPage['state']>(stateDefault);
    const router = useRouter();
    const goHome = () => router.push('/');
    const handleZoomIn = () => setState({ ...state, scale: state.scale + 0.1 });
    const handleZoomOut = () => setState({ ...state, scale: state.scale - 0.1 });
    return (
        <EbookContext.Provider value={{ state, setState }}>
            <div className='max-w-screen-lg mx-auto my-2 shadow-md'>
                <div className='sticky top-0 z-10 bg-white grid grid-cols-3 p-1 items-center justify-between'>
                    <div className='flex items-center justify-start'>
                        <Button
                            onClick={router.back}
                            size='icon'
                            variant={'ghost'}
                            className='font-normal cursor-pointer !text-blue-500'
                        >
                            <Undo />
                        </Button>
                        <Button
                            onClick={goHome}
                            size='icon'
                            variant={'ghost'}
                            className='font-normal cursor-pointer !text-blue-500'
                        >
                            <House />
                        </Button>
                        <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                            <SkipBack />
                        </Button>
                        <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                            <CirclePlay />
                        </Button>
                        <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                            <SkipForward />
                        </Button>
                        <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                            <Volume2 />
                        </Button>
                    </div>
                    <div className='inline-flex justify-center space-x-1 items-center'>
                        <Button
                            onClick={handleZoomIn}
                            size='icon'
                            variant={'ghost'}
                            className='font-normal cursor-pointer !text-blue-500'
                        >
                            <ZoomIn />
                        </Button>
                        <p className='text-xs px-1'>
                            {Math.round(state.scale * 100)}%
                        </p>
                        <Button
                            onClick={handleZoomOut}
                            size='icon'
                            variant={'ghost'}
                            className='font-normal cursor-pointer !text-blue-500'
                        >
                            <ZoomOut />
                        </Button>
                    </div>
                    <div className='flex items-center justify-end'>
                        <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                            <Type />
                        </Button>
                        <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                            <Bookmark />
                        </Button>
                        <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                            <ChevronLeft />
                        </Button>
                        <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                            <ChevronRight />
                        </Button>
                        <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                            <SlidersVertical />
                        </Button>
                    </div>
                </div>
                <div className='overflow-auto'>
                    <PdfViewer />
                </div>
            </div>
        </EbookContext.Provider>
    );
};

export default EbookPage;
