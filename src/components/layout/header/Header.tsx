import React from 'react';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';
import GroupAuth from './GroupAuth';
import Account from './Account';
const Header = () => {
    return (
        <div className='border-b'>
            <div className='max-w-screen-lg mx-auto py-1.5 px-2 flex items-center justify-between'>
                <Link href={'/'} className='border p-1 rounded-md'>
                    <Home size={16} className='dark:stroke-blue-500' />
                </Link>
                <div className='space-x-2 flex items-center'>
                    <GroupAuth />
                    <ModeToggle />
                    <Account />
                </div>
            </div>
        </div>
    );
};

export default Header;
