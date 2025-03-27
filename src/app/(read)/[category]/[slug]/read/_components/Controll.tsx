import { Button } from '@/components/ui/button';
import { usePdf } from '@/provider/pdf/context';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bookmark, Check, ChevronLeft, ChevronRight, FileDigit, NotebookTabs, Type } from 'lucide-react';
import React from 'react';
import { Input } from '@/components/ui/input';
import useDoubleRightClick, { useArrowKeyListener, useTripleClickListener } from '@/hooks/useTriggerPdf';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Controll = () => {
    const [pageNumber, setPageNumber] = React.useState('');
    const pdf = usePdf();
    const handleNext = () => {
        if (pdf.state.viewMode === 'double') {
            if (pdf.state.pageNumber + 1 >= pdf.state.totalPages) return;
            pdf.setState({ ...pdf.state, pageNumber: pdf.state.pageNumber + 2 });
            return;
        }
        if (pdf.state.pageNumber >= pdf.state.totalPages) return;
        pdf.setState({ ...pdf.state, pageNumber: pdf.state.pageNumber + 1 });
    };
    const handlePrev = () => {
        if (pdf.state.pageNumber === 1) return;
        if (pdf.state.viewMode === 'double') {
            pdf.setState({ ...pdf.state, pageNumber: pdf.state.pageNumber - 2 });
            return;
        }
        pdf.setState({ ...pdf.state, pageNumber: pdf.state.pageNumber - 1 });
    };
    const onGoPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const value = Number(e.currentTarget.value);
            if (isNaN(value)) return;
            if (value > pdf.state.totalPages || value < 1) return;
            pdf.setState({ ...pdf.state, pageNumber: value });
        }
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPageNumber(e.target.value);
    };
    const handleGoPage = () => {
        const value = Number(pageNumber);
        if (isNaN(value)) return;
        if (value > pdf.state.totalPages || value < 1) return;
        pdf.setState({ ...pdf.state, pageNumber: value });
    };
    useTripleClickListener({
        onClickLeft: handlePrev,
        onClickRight: handleNext
    });
    useArrowKeyListener({
        onClickLeft: handlePrev,
        onClickRight: handleNext
    });
    const handleRightClick = (_: MouseEvent, side: 'left' | 'right') => {
        if (side === 'left') handlePrev();
        else handleNext();
    };
    useDoubleRightClick(handleRightClick);
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                        <FileDigit />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='p-2'>
                    <div className='flex items-center overflow-hidden rounded-sm'>
                        <Input
                            value={pageNumber}
                            onKeyDown={onGoPage}
                            onChange={onChange}
                            className='rounded-none border-none bg-gray-100'
                        />
                        <Button onClick={handleGoPage} className='rounded-none cursor-pointer !bg-blue-500'>
                            <Check />
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
            <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                <Type />
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                        <NotebookTabs />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className='sr-only'></SheetTitle>
                        <SheetDescription>
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
                className='font-normal cursor-pointer !text-blue-500'
            >
                <ChevronLeft />
            </Button>
            <Button
                onClick={handleNext}
                size='icon'
                variant={'ghost'}
                className='font-normal cursor-pointer !text-blue-500'
            >
                <ChevronRight />
            </Button>
        </>
    );
};

export default Controll;
