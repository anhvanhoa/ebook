import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Columns2, GalleryHorizontal, GalleryVertical, RectangleVertical, SlidersVertical } from 'lucide-react';
import { usePdf } from '@/provider/pdf/content';

const Option = () => {
    const pdt = usePdf();
    const handleViewMode = (mode: 'single' | 'double') => {
        if (pdt.state.viewMode === mode) return;
        pdt.setState({ ...pdt.state, viewMode: mode });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                    <SlidersVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className='flex items-center'>
                    <GalleryVertical />
                    <span>Cuộn dọc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <GalleryHorizontal />
                    <span>Cuộn ngang</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer' onClick={() => handleViewMode('single')}>
                    <RectangleVertical />
                    <span>1 trang</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={() => handleViewMode('double')}>
                    <Columns2 />
                    <span>2 trang</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Option;
