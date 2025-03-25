import { Button } from '@/components/ui/button';
import { AlignJustify } from 'lucide-react';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const ebookCategories = [
    { id: 1, name: 'Tiểu thuyết', link: '/category/tieu-thuyet' },
    { id: 2, name: 'Kinh dị', link: '/category/kinh-di' },
    { id: 3, name: 'Trinh thám', link: '/category/trinh-tham' },
    { id: 4, name: 'Lãng mạn', link: '/category/lang-man' },
    { id: 5, name: 'Khoa học viễn tưởng', link: '/category/khoa-hoc-vien-tuong' },
    { id: 6, name: 'Giả tưởng', link: '/category/gia-tuong' },
    { id: 7, name: 'Hài hước', link: '/category/hai-huoc' },
    { id: 8, name: 'Tâm lý', link: '/category/tam-ly' },
    { id: 9, name: 'Học thuật', link: '/category/hoc-thuat' },
    { id: 10, name: 'Kinh doanh', link: '/category/kinh-doanh' },
    { id: 11, name: 'Kỹ năng sống', link: '/category/ky-nang-song' },
    { id: 12, name: 'Lịch sử', link: '/category/lich-su' },
    { id: 13, name: 'Triết học', link: '/category/triet-hoc' },
    { id: 14, name: 'Khoa học', link: '/category/khoa-hoc' },
    { id: 15, name: 'Công nghệ', link: '/category/cong-nghe' },
    { id: 16, name: 'Sách thiếu nhi', link: '/category/thieu-nhi' },
    { id: 17, name: 'Sách nghệ thuật', link: '/category/nghe-thuat' },
    { id: 18, name: 'Sách nấu ăn', link: '/category/nau-an' },
    { id: 19, name: 'Sách du lịch', link: '/category/du-lich' },
    { id: 20, name: 'Sách tôn giáo', link: '/category/ton-giao' }
];

const List = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='focus-visible:ring-0'>
                <Button size='icon' variant={'ghost'} className='font-normal cursor-pointer !text-blue-500'>
                    <AlignJustify />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='overflow-hidden p-0'>
                <div className='h-96 overflow-auto custom-scrollbar p-1.5'>
                    {ebookCategories.map((category, i) => (
                        <DropdownMenuItem key={i} className='cursor-pointer'>
                            {category.name}
                        </DropdownMenuItem>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default List;
