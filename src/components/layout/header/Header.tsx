import React from 'react';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';
const Header = () => {
    return (
        <div className='border-b'>
            <div className='max-w-screen-lg mx-auto py-1.5 px-2 flex items-center justify-between'>
                <Link href={'/'} className='border p-1 rounded-md'>
                    <Home size={16} className='dark:stroke-blue-500' />
                </Link>
                <div className='space-x-2 flex items-center'>
                    <p className='flex items-center space-x-1 mr-3'>
                        <Link href='/login' className='text-sm text-blue-500 hover:underline transition'>
                            Đăng nhập
                        </Link>
                        <span className='h-3 w-[1px] bg-blue-500 shrink-0'></span>
                        <Link href='/sign-up' className='text-sm text-blue-500 hover:underline transition'>
                            Đăng ký
                        </Link>
                    </p>
                    <ModeToggle />
                    {/* <Button variant={'outline'} className='h-auto !p-1 !text-blue-500'>
                <User size={16} />
            </Button> */}
                </div>
            </div>
        </div>
    );
};

export default Header;
