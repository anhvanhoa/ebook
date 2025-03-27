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
import MdViewer from './_components/MdViewer';

const stateDefault: Partial<EbookContextPageState> = {
    // fileUrl: '/e.pdf',
    typeFile: 'md',
    totalPages: 6,
    pages: [
        {
            content: '## NASA\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Quae ab ipsam repellendus quos dicta beatae laboriosam culpa qui consequatur natus. Ab quibusdam eum minima commodi esse. Nisi officia excepturi nemo.',
            pageNumber: 1
        },
        {
            content: '## NASA\nJust a link: www.nasa.gov 2.',
            pageNumber: 2
        },
        {
            content: '## NASA\nJust a link: www.nasa.gov 3.',
            pageNumber: 3
        },
        {
            content: '## NASA\nJust a link: www.nasa.gov 4.',
            pageNumber: 4
        },
        {
            content: '## NASA\nJust a link: www.nasa.gov 5.',
            pageNumber: 5
        },
        {
            content: '## NASA\nJust a link: www.nasa.gov 6.',
            pageNumber: 6
        }
    ]
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
                        <Controll />
                        <Option />
                    </div>
                </div>
                {stateDefault.typeFile === 'pdf' && <PdfViewer />}
                {stateDefault.typeFile === 'md' && <MdViewer />}
            </div>
        </EbookProvider>
    );
};

export default EbookPage;
