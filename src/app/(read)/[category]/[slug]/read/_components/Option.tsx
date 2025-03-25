import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { GalleryHorizontal, GalleryVertical, SlidersVertical } from 'lucide-react';

const Option = () => {
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
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Option;
