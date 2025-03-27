'use client';
import { Button } from '@/components/ui/button';
import { House, Undo } from 'lucide-react';
import PdfViewer from './_components/PDF';
import { useRouter } from 'next/navigation';
import List from './_components/List';
import Option from './_components/Option';
import Zoom from './_components/Zoom';
import Controll from './_components/Controll';
import HtmlViewer from './_components/HtmlViewer';
import ImgViewer from './_components/ImgViewer';
import { usePdf } from '@/provider/pdf/context';

const Read = () => {
    const pdf = usePdf();
    const router = useRouter();
    const goHome = () => router.push('/');
    return (
        <div style={{ backgroundColor: pdf.state.background, color: `${pdf.state.color}` }}>
            <div
                style={{ backgroundColor: pdf.state.background }}
                className='mx-auto sticky top-0 z-10 grid grid-cols-3 py-1 px-2 items-center justify-between'
            >
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
            {pdf.state.typeFile === 'pdf' && <PdfViewer />}
            {pdf.state.typeFile === 'html' && <HtmlViewer />}
            {pdf.state.typeFile === 'image' && <ImgViewer />}
        </div>
    );
};

export default Read;
