import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bookmark, ChevronLeft, ChevronRight, FileDigit, NotebookTabs } from 'lucide-react';
import React from 'react';
import { useArrowKeyListener, useControll } from '@/hooks/useTriggerPdf';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoPage from './GoPage';
import { usePdf } from '@/provider/pdf/context';
import TableContent from './TableContent';

const Controll = () => {
    const pdf = usePdf();
    const controll = useControll();
    useArrowKeyListener({
        onClickLeft: controll.handlePrev,
        onClickRight: controll.handleNext
    });
    const handlePrev = () => {
        if (pdf.state.typeFile !== 'epub') return controll.handlePrev();
        pdf.state.rendition?.prev();
    };

    const handleNext = () => {
        if (pdf.state.typeFile !== 'epub') return controll.handleNext();
        pdf.state.rendition?.next();
    };
    return (
        <>
            {pdf.state.typeFile !== 'image' && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            size='icon'
                            variant={'ghost'}
                            className='hidden sm:flex font-normal cursor-pointer !text-blue-500'
                        >
                            <FileDigit />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-2'>
                        <GoPage />
                    </PopoverContent>
                </Popover>
            )}
            <Sheet>
                <SheetTrigger asChild>
                    <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                        <NotebookTabs />
                    </Button>
                </SheetTrigger>
                <SheetContent className='!max-w-md'>
                    <SheetHeader className='h-full'>
                        <SheetTitle className='sr-only'></SheetTitle>
                        <SheetDescription className='sr-only'></SheetDescription>
                        <Tabs defaultValue='toc' className='h-full'>
                            <TabsList>
                                <TabsTrigger className='text-xs xs:text-sm' value='toc'>
                                    Mục lục
                                </TabsTrigger>
                                <TabsTrigger className='text-xs xs:text-sm' value='bookmark'>
                                    Dấu trang
                                </TabsTrigger>
                                <TabsTrigger className='text-xs xs:text-sm' value='note'>
                                    Ghi chú
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value='toc' className='overflow-auto flex-1 -mr-4 custom-scrollbar'>
                                <TableContent data={pdf.state.tableContents} />
                            </TabsContent>
                            <TabsContent value='bookmark'>Change your password here.</TabsContent>
                            <TabsContent value='note'>Change your password here.</TabsContent>
                        </Tabs>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                <Bookmark />
            </Button>
            <Button
                onClick={handlePrev}
                size='icon'
                variant={'ghost'}
                className='hidden sm:flex font-normal cursor-pointer !text-blue-500'
            >
                <ChevronLeft />
            </Button>
            <Button
                onClick={handleNext}
                size='icon'
                variant={'ghost'}
                className='hidden sm:flex font-normal cursor-pointer !text-blue-500'
            >
                <ChevronRight />
            </Button>
        </>
    );
};

export default Controll;
