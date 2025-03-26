'use client';
import { Button } from '@/components/ui/button';
import { House, Undo } from 'lucide-react';
import React from 'react';
import PdfViewer from './_components/PDF';
import { useRouter } from 'next/navigation';
import List from './_components/List';
import Option from './_components/Option';
import EbookProvider, { EbookContextPageState } from '@/provider/pdf/context';
import Zoom from './_components/Zoom';
import Controll from './_components/Controll';

const stateDefault: Partial<EbookContextPageState> = {
    fileUrl: '/go-book.pdf',
    scroll: 'vertical'
};

const EbookPage = () => {
    const router = useRouter();
    const goHome = () => router.push('/');
    return (
        <EbookProvider init={stateDefault}>
            <div>
                <div className='mx-auto sticky top-0 z-10 bg-white grid grid-cols-3 p-1 items-center justify-between'>
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
                        <List />
                    </div>
                    <Zoom />
                    <div className='flex items-center justify-end'>
                        <Controll/>
                        <Option />
                    </div>
                </div>
                <div className='overflow-x-auto h-[calc(100vh-2.75rem)] custom-scrollbar shadow-md'>
                    <PdfViewer />
                </div>
            </div>
        </EbookProvider>
    );
};

export default EbookPage;
