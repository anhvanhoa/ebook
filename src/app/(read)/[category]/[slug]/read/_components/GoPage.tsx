'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { usePdf } from '@/provider/pdf/context';
import { cn } from '@/lib/utils';

type GoPageProps = {
    className?: string;
};

const GoPage = ({ className }: GoPageProps) => {
    const pdf = usePdf();
    const [pageNumber, setPageNumber] = React.useState('');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPageNumber(e.target.value);
    };
    const handleGoPage = () => {
        const value = Number(pageNumber);
        if (isNaN(value)) return;
        if (value > pdf.state.totalPages || value < 1) return;
        pdf.setState({ ...pdf.state, pageNumber: value });
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
        <div className={cn('flex items-center overflow-hidden rounded-sm', className)}>
            <Input
                placeholder='Nhập trang...'
                value={pageNumber}
                onKeyDown={onGoPage}
                onChange={onChange}
                className='rounded-none border-none bg-gray-100 placeholder:text-xs sm:placeholder:text-sm text-xs sm:text-sm'
            />
            <Button onClick={handleGoPage} className='rounded-none cursor-pointer !bg-blue-500'>
                <Check />
            </Button>
        </div>
    );
};

export default GoPage;
