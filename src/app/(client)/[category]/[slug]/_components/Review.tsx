import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export default function Review() {
    return (
        <Card className='w-full border-none shadow-none py-3'>
            <CardContent className='p-2'>
                <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Avatar className='h-10 w-10'>
                                <AvatarImage src='/placeholder.svg?height=40&width=40' alt='Bùi Lon Di' />
                                <AvatarFallback>BLD</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className='font-medium text-sm'>Bùi Lon Di</h3>
                                <div className='flex items-center gap-2 text-xs text-gray-500'>
                                    <span>1 giờ trước</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='text-sm text-gray-700'>
                        Phim dở, ko có nội dung, hù ma cũng ko tốt, tạo hình ma ko rùng rợn, phim rất nhạt nhẽo, ko đáng
                        tiền bỏ ra xem
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
