import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ChevronDown, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePdf } from '@/provider/pdf/context';
import { useZoom } from '@/hooks/useTriggerPdf';
import { cn } from '@/lib/utils';

const Max = 300;
type ZoomProps = {
    className?: string;
};

const Zoom = ({ className = 'inline-flex' }: ZoomProps) => {
    const pdt = usePdf();
    const handleZoomIn = () => {
        if (pdt.state.scale >= Max / 100) return;
        pdt.setState({ ...pdt.state, scale: pdt.state.scale + 0.05 });
    };
    const handleZoomOut = () => {
        if (pdt.state.scale <= 0.05) return;
        pdt.setState({ ...pdt.state, scale: pdt.state.scale - 0.05 });
    };
    const changeZoom = (scale: number) => pdt.setState({ ...pdt.state, scale });
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace('%', '');
        if (isNaN(Number(value))) return;
        if (Number(value) > Max) return pdt.setState({ ...pdt.state, scale: Max / 100 });
        pdt.setState({ ...pdt.state, scale: Number(value) / 100 });
    };
    useZoom({
        onMouseDown: handleZoomOut,
        onMouseUp: handleZoomIn
    });
    return (
        <div className={cn('inline-flex justify-center space-x-1 items-center', className)}>
            <Button
                onClick={handleZoomOut}
                size='icon'
                variant={'ghost'}
                className='font-normal cursor-pointer !text-blue-500'
            >
                <ZoomOut />
            </Button>
            <DropdownMenu>
                <div className='flex items-center'>
                    <Input
                        onChange={onChange}
                        value={`${Math.round(pdt.state.scale * 100)}%`}
                        className='px-1 text-xs w-14 text-center border-none h-auto py-2 text-blue-500'
                    />
                    <DropdownMenuTrigger asChild className='p-0.5 focus-visible:ring-0 cursor-pointer'>
                        <Button
                            size='sm'
                            variant={'ghost'}
                            className='font-normal cursor-pointer !text-blue-500 h-auto !px-1 py-1'
                        >
                            <ChevronDown className='size-4' />
                        </Button>
                    </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={() => changeZoom(0.25)} className='cursor-pointer'>
                        25%
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeZoom(0.5)} className='cursor-pointer'>
                        50%
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeZoom(0.7)} className='cursor-pointer'>
                        70%
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeZoom(1)} className='cursor-pointer'>
                        100%
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeZoom(1.25)} className='cursor-pointer'>
                        125%
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeZoom(1.5)} className='cursor-pointer'>
                        150%
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeZoom(1.75)} className='cursor-pointer'>
                        175%
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeZoom(2)} className='cursor-pointer'>
                        200%
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button
                onClick={handleZoomIn}
                size='icon'
                variant={'ghost'}
                className='font-normal cursor-pointer !text-blue-500'
            >
                <ZoomIn />
            </Button>
        </div>
    );
};

export default Zoom;
