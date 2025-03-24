import { Button } from '@/components/ui/button';
import { Bookmark, ChevronLeft, ChevronRight, House, Type, Undo } from 'lucide-react';
import React from 'react';
import PDF from './_components/PDF';
import PdfViewer from './_components/PDF';

const EbookPage = async () => {
    return (
        <div className='max-w-screen-lg mx-auto my-8'>
            <div className='grid grid-cols-2'>
                <div className='shadow h-72 p-1'>
                    <div className='flex items-center'>
                        <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                            <Undo />
                        </Button>
                        <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                            <House />
                        </Button>
                    </div>
                    {/* <PDF /> */}
                </div>
                <div className='shadow p-1'>
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
                    </div>
                    <PdfViewer fileUrl={'/ebook.pdf'}  />
                </div>
            </div>
        </div>
    );
};

export default EbookPage;
