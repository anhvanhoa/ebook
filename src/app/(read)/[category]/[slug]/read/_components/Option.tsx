import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Columns2, Fullscreen, Minimize, RectangleVertical, SlidersVertical } from 'lucide-react';
import { usePdf } from '@/provider/pdf/context';
import { cn } from '@/lib/utils';

const Option = () => {
    const pdt = usePdf();
    const [isFullScreen, setIsFullScreen] = React.useState(false);
    const handleViewMode = (mode: 'single' | 'double') => {
        let i = 0;
        if (pdt.state.viewMode === mode) return;
        if (mode === 'double' && pdt.state.pageNumber % 2 === 0) i = 1;
        pdt.setState({ ...pdt.state, viewMode: mode, pageNumber: pdt.state.pageNumber - i });
    };
    const handleFullScreen = () => {
        const elem = document.documentElement;
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullScreen(false);
        } else {
            elem.requestFullscreen();
            setIsFullScreen(true);
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                    <SlidersVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleFullScreen} className='flex items-center cursor-pointer'>
                    {!isFullScreen && (
                        <>
                            <Fullscreen />
                            <span>Đẩy đủ màn hình</span>
                        </>
                    )}
                    {isFullScreen && (
                        <>
                            <Minimize />
                            <span>Thu nhỏ màn hình</span>
                        </>
                    )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className={cn('cursor-pointer', {
                        '!text-blue-500 *:stroke-blue-500': pdt.state.viewMode === 'single'
                    })}
                    onClick={() => handleViewMode('single')}
                >
                    <RectangleVertical />
                    <span>1 trang</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={cn('cursor-pointer', {
                        '!text-blue-500 *:stroke-blue-500': pdt.state.viewMode === 'double'
                    })}
                    onClick={() => handleViewMode('double')}
                >
                    <Columns2 />
                    <span>2 trang</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Option;
