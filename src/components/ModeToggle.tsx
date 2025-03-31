'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const handleModeChange = () => {
        if (resolvedTheme === 'light') setTheme('dark');
        else if (resolvedTheme === 'dark') setTheme('light');
        else setTheme('system');
    };
    return (
        <Button onClick={handleModeChange} variant={'outline'} className='h-auto !p-1 !text-blue-500 cursor-pointer'>
            <Moon size={16} className='rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <Sun size={16} className='absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        </Button>
    );
}
