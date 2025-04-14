'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/provider/user/context';
import { User } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Account = () => {
    const user = useUser();
    return (
        <>
            {user.isLoggedIn && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} className='h-auto !p-1 !text-blue-500 cursor-pointer'>
                            <User size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
};

export default Account;
