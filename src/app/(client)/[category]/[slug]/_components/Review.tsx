import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reply, User } from 'lucide-react';
import Like from './Like';

type ReviewProps = {
    comment: { id: string; name: string; time: string; content: string; avatar?: string };
};

export default function Review({ comment }: ReviewProps) {
    return (
        <Card className='w-full border-none shadow-none p-0'>
            <CardContent className='p-4'>
                <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Avatar className='size-9'>
                                <AvatarImage src={comment.avatar} alt='Bùi Lon Di' />
                                <AvatarFallback className='flex items-center justify-center'>
                                    <User size={16} className='stroke-gray-500' />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className='font-medium text-sm space-x-1'>
                                    <span>{comment.name}</span>
                                    <span>·</span>
                                    <span className='text-rose-600 text-xs'>Tác giả</span>
                                </h3>
                                <div className='flex items-center gap-2 text-xs text-gray-500'>
                                    <span>
                                        {comment.time} - <span className='text-gray-400'>1 người thấy hữu ích</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button variant='ghost' className='h-8 w-8 rounded-full p-0 cursor-pointer'>
                                <Reply />
                            </Button>
                            <Like />
                        </div>
                    </div>
                    <p className='text-sm text-gray-700'>{comment.content}</p>
                </div>
            </CardContent>
        </Card>
    );
}
