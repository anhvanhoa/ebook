import { Button } from '@/components/ui/button';
import { Bookmark, ChevronLeft, ChevronRight, House, Type, Undo } from 'lucide-react';
import React from 'react';
import PdfViewer from './_components/PDF';

const EbookPage = async () => {
    return (
        <div className='max-w-screen-lg mx-auto my-8'>
            <div className='flex p-1 items-center justify-between'>
                <div>
                    <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                        <Undo />
                    </Button>
                    <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                        <House />
                    </Button>
                </div>
                <div>
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
                </div>
            </div>
            <PdfViewer fileUrl={'/e.pdf'} />
        </div>
    );
};

export default EbookPage;
