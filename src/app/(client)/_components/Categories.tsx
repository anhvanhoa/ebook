import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { query } from '@/lib/prisma-client';

const Categories = async () => {
    const categories = await query(async (prisma) => {
        return await prisma.category.findMany({
            include: {
                ebooks: true
            }
        });
    });
    return (
        <div className='py-1'>
            <div className='max-w-screen-lg mx-auto px-12 md:px-14'>
                <Carousel>
                    <CarouselContent className='-ml-2'>
                        {categories.map((category, i) => (
                            <CarouselItem key={i} className='pl-2 text-sm md:basis-1/7 sm:basis-1/5 basis-1/3'>
                                <Link
                                    key={category.id}
                                    href={category.slug}
                                    className='block py-2 text-center hover:underline underline-offset-1'
                                >
                                    <span className='line-clamp-1'>
                                        ({category.ebooks.length}) {category.name}
                                    </span>
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
