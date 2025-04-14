import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import React from 'react';

const Comment = () => {
    return (
        <div className='flex items-center gap-2 p-3'>
            <Textarea placeholder='Nhập bình luận của bạn' className='w-full resize-none' />
            <Button variant='secondary' size={'icon'} className='rounded-full p-0 cursor-pointer'>
                <Send />
            </Button>
        </div>
    );
};

export default Comment;
