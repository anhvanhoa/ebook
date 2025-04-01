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
import { stateDefault, usePdf } from '@/provider/pdf/context';
import { useControll, useDoubleRightClick, useResize } from '@/hooks/useTriggerPdf';
import ControllMobi from './_components/ControllMobi';
import { useRef } from 'react';
import EpubViewer from './_components/EpubViewer';

const Read = () => {
    const pdf = usePdf();
    const router = useRouter();
    const goHome = () => router.push('/');
    const { handleNext, handlePrev } = useControll();
    useResize(() => {
        const { innerWidth } = window;
        if (innerWidth <= 1024) {
            pdf.setState((state) => ({
                ...state,
                isMobile: true
            }));
        } else {
            pdf.setState((state) => ({
                ...state,
                isMobile: false
            }));
        }
        if (innerWidth < stateDefault.width) {
            pdf.setState((state) => ({
                ...state,
                width: innerWidth
            }));
        } else if (innerWidth > stateDefault.width) {
            pdf.setState((state) => ({
                ...state,
                width: stateDefault.width
            }));
        }
    });
    const containerRef = useRef<HTMLDivElement>(null); // Ref đến thẻ div
    // useTripleClickListener({
    //     onClickLeft: handlePrev,
    //     onClickRight: handleNext,
    //     ref: containerRef
    // });
    const handleRightClick = (_: MouseEvent, side: 'left' | 'right') => {
        if (side === 'left') handlePrev();
        else handleNext();
    };
    useDoubleRightClick(containerRef, handleRightClick);
    return (
        <div style={{ backgroundColor: pdf.state.background, color: `${pdf.state.color}` }}>
            <div
                style={{ backgroundColor: pdf.state.background }}
                className='mx-auto sticky top-0 z-10 grid grid-cols-2 sm:grid-cols-3 py-1 px-2 items-center justify-between'
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
                <Zoom className='hidden sm:inline-flex' />
                <div className='flex items-center justify-end'>
                    <Controll />
                    <Option />
                </div>
            </div>
            <div ref={containerRef}>
                {pdf.state.typeFile === 'pdf' && <PdfViewer />}
                {pdf.state.typeFile === 'html' && <HtmlViewer />}
                {pdf.state.typeFile === 'image' && <ImgViewer />}
                {pdf.state.typeFile === 'epub' && <EpubViewer />}
            </div>
            <ControllMobi />
        </div>
    );
};

export default Read;
