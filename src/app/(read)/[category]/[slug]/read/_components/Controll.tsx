import { Button } from '@/components/ui/button';
import { usePdf } from '@/provider/pdf/context';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bookmark, Check, ChevronLeft, ChevronRight, FileDigit, Type } from 'lucide-react';
import React from 'react';
import { Input } from '@/components/ui/input';

const Controll = () => {
    const [pageNumber, setPageNumber] = React.useState(0);
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
                            value={pageNumber > 0 ? pageNumber : pdf.state.totalPages}
                            onKeyDown={onGoPage}
                            className='rounded-none border-none bg-gray-100'
                        />
                        <Button className='rounded-none cursor-pointer !bg-blue-500'>
                            <Check />
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                <Type />
            </Button>
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
