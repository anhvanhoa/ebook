import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bookmark, ChevronLeft, ChevronRight, FileDigit, NotebookTabs } from 'lucide-react';
import React from 'react';
import { useArrowKeyListener, useControll } from '@/hooks/useTriggerPdf';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoPage from './GoPage';

const Controll = () => {
    const { handleNext, handlePrev } = useControll();
    useArrowKeyListener({
        onClickLeft: handlePrev,
        onClickRight: handleNext
    });
    return (
        <>
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
            <Sheet>
                <SheetTrigger asChild>
                    <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                        <NotebookTabs />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className='sr-only'></SheetTitle>
                        <SheetDescription asChild>
                            <Tabs defaultValue='toc' className='w-[400px]'>
                                <TabsList>
                                    <TabsTrigger value='toc'>Mục lục</TabsTrigger>
                                    <TabsTrigger value='bookmark'>Dấu trang</TabsTrigger>
                                    <TabsTrigger value='note'>Ghi chú</TabsTrigger>
                                </TabsList>
                                <TabsContent value='toc'>Make changes to your account here.</TabsContent>
                                <TabsContent value='bookmark'>Change your password here.</TabsContent>
                                <TabsContent value='note'>Change your password here.</TabsContent>
                            </Tabs>
                        </SheetDescription>
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
