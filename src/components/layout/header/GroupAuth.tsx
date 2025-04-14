'use client';
import { useUser } from '@/provider/user/context';
import Link from 'next/link';
import React from 'react';

const GroupAuth = () => {
    const user = useUser();
    return (
        <>
            {!user.isLoggedIn && (
                <p className='flex items-center space-x-1 mr-3'>
                    <Link href='/login' className='text-sm text-blue-500 hover:underline transition'>
                        Đăng nhập
                    </Link>
                    <span className='h-3 w-[1px] bg-blue-500 shrink-0'></span>
                    <Link href='/sign-up' className='text-sm text-blue-500 hover:underline transition'>
                        Đăng ký
                    </Link>
                </p>
            )}
        </>
    );
};

export default GroupAuth;
