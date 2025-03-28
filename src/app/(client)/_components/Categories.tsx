import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';

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

const Categories = () => {
    return (
        <div className='py-1'>
            <div className='max-w-screen-lg mx-auto px-12 md:px-14'>
                <Carousel>
                    <CarouselContent className='-ml-2'>
                        {ebookCategories.map((category, i) => (
                            <CarouselItem key={i} className='pl-2 text-sm md:basis-1/7 sm:basis-1/5 basis-1/3'>
                                <Link
                                    key={category.id}
                                    href={category.link}
                                    className='block py-2 text-center hover:underline underline-offset-1'
                                >
                                    <span className='line-clamp-1'>{category.name}</span>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='border-none shadow-none' />
                    <CarouselNext className='border-none shadow-none' />
                </Carousel>
            </div>
        </div>
    );
};

export default Categories;
