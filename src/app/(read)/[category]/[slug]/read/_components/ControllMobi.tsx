import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';
import Zoom from './Zoom';
import GoPage from './GoPage';

const ControllMobi = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size='icon'
                    variant={'secondary'}
                    className='sm:hidden z-50 fixed rounded-full bottom-2.5 right-2.5 shadow-2xl font-normal cursor-pointer !text-blue-500'
                >
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='sm:hidden'>
                <Zoom className='inline-flex w-full' />
                <DropdownMenuSeparator />
                <GoPage />
                <DropdownMenuSeparator />
                <div className='flex items-center justify-between'>
                    <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                        <ChevronLeft />
                    </Button>
                    <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                        <ChevronRight />
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ControllMobi;
