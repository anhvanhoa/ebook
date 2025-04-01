import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Columns2, Fullscreen, Minimize, Moon, RectangleVertical, SlidersVertical, Sun } from 'lucide-react';
import { usePdf } from '@/provider/pdf/context';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const colors = [
    { id: 1, name: 'Trắng ngà', bg: '#FFFFF0', color: '#000000' },
    { id: 2, name: 'Beige', bg: '#F5F5DC', color: '#000000' },
    { id: 3, name: 'Xám tro', bg: '#3a3a3a', color: '#FFFFFF' },
    { id: 4, name: 'Xanh pastel', bg: '#fff', color: '#000' },
    { id: 5, name: 'Đen tuyền', bg: '#000000', color: '#FFFFFF' }
];

const fonts = [
    { name: 'Noto Serif', variable: '--font-noto-serif' },
    { name: 'Lora', variable: '--font-lora' },
    { name: 'Merriweather', variable: '--font-merriweather' },
    { name: 'Roboto Slab', variable: '--font-roboto-slab' },
    { name: 'EB Garamond', variable: '--font-eb-garamond' },
    { name: 'Geist Mono', variable: '--font-geist-mono' },
    { name: 'Geist', variable: '--font-geist-sans' },
    { name: 'Mặc định', variable: '--font-default' }
];

const Option = () => {
    const pdt = usePdf();
    const { setTheme, theme } = useTheme();
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
    const handleModeChange = () => {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('light');
        else setTheme('system');
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                    <SlidersVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='p-0 overflow-hidden'>
                <DropdownMenuLabel className='bg-gray-200 dark:bg-slate-700 py-2 text-center text-xs'>
                    Màu nền
                </DropdownMenuLabel>
                <div className='grid grid-cols-5 py-1 px-1'>
                    {colors.map((color) => (
                        <DropdownMenuItem
                            key={color.id}
                            className='p-1'
                            onClick={() => pdt.setState({ ...pdt.state, background: color.bg, color: color.color })}
                        >
                            <span
                                className='cursor-pointer size-6 rounded-full border'
                                style={{ backgroundColor: color.bg }}
                            ></span>
                        </DropdownMenuItem>
                    ))}
                </div>
                {['html', 'epub'].includes(pdt.state.typeFile) && (
                    <>
                        <DropdownMenuLabel className='bg-gray-200 dark:bg-slate-700 py-2 text-center text-xs'>
                            Font chữ
                        </DropdownMenuLabel>
                        <div className='p-1'>
                            {fonts.map((font) => (
                                <DropdownMenuItem
                                    key={font.name}
                                    className='cursor-pointer'
                                    onClick={() => pdt.setState({ ...pdt.state, fontFamily: font.variable })}
                                >
                                    <span>{font.name}</span>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </>
                )}
                <DropdownMenuLabel className='bg-gray-200 dark:bg-slate-700 py-2 text-center text-xs'>
                    Tùy chỉnh
                </DropdownMenuLabel>
                <div className='p-1'>
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
                    <DropdownMenuItem className={cn('cursor-pointer')} onClick={handleModeChange}>
                        {theme === 'light' ? <Moon /> : <Sun />}
                        <span>{theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}</span>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Option;
