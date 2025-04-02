import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bookmark, ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';
import Zoom from './Zoom';
import GoPage from './GoPage';
import { usePdf } from '@/provider/pdf/context';
import { useControll } from '@/hooks/useTriggerPdf';

const ControllMobi = () => {
    const pdf = usePdf();
    const { handleNext, handlePrev } = useControll();
    return (
        <div className='sm:hidden z-50 fixed bottom-1 right-2.5 flex items-center justify-between gap-x-1'>
            <Button
                onClick={handlePrev}
                size='icon'
                variant={'ghost'}
                className='rounded-full shadow-2xl font-normal cursor-pointer !text-blue-500'
            >
                <ChevronLeft />
            </Button>
            <Button
                onClick={handleNext}
                size='icon'
                variant={'ghost'}
                className='rounded-full shadow-2xl font-normal cursor-pointer !text-blue-500'
            >
                <ChevronRight />
            </Button>
            <Button
                size='icon'
                variant={'ghost'}
                className='rounded-full shadow-2xl font-normal cursor-pointer !text-blue-500'
            >
                <Bookmark />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size='icon'
                        variant={'ghost'}
                        className='rounded-full shadow-2xl font-normal cursor-pointer !text-blue-500'
                    >
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='sm:hidden'>
                    <Zoom className='inline-flex w-full' />
                    {pdf.state.typeFile !== 'image' && (
                        <>
                            <DropdownMenuSeparator />
                            <GoPage />
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ControllMobi;
