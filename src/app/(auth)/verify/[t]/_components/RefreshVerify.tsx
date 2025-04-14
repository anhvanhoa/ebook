'use client';
import { refreshTokenHandle } from '@/action/auth';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

type Props = {
    email: string;
};

const RefreshVerify = ({ email }: Props) => {
    const refresh = useMutation({
        mutationFn: async (e: string) => refreshTokenHandle(e),
        onSuccess: (data) => toast.info(data.message),
        onError: (error) => toast.error(error.message)
    });
    const onRefresh = () => refresh.mutate(email);
    return (
        <div className='flex justify-center mt-6'>
            <Button onClick={onRefresh} variant='outline' className='w-full cursor-pointer py-3 h-auto'>
                Yêu cầu xác minh mới
            </Button>
        </div>
    );
};

export default RefreshVerify;
