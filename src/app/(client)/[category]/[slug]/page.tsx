import { Button } from '@/components/ui/button';
import { ArrowDownToLine, BookOpen, Play, Star, Volume2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Ebook from './Ebook';
import Link from 'next/link';

const page = () => {
    return (
        <div>
            <div>
                <div className='relative bg-black'>
                    <div className='relative z-10 text-white inset-0 from-black/50 to-black to-80% bg-gradient-to-l'>
                        <div className='max-w-screen-lg mx-auto'>
                            <div className='flex h-full py-12'>
                                <div className='flex-shrink-đ'>
                                    <Image
                                        className='w-64 aspect-[4/6] rounded-md'
                                        src={'/images/ebook.webp'}
                                        alt='MAI'
                                        width={300}
                                        height={500}
                                    />
                                </div>
                                <div className='ml-10'>
                                    <div
                                        className={`font-medium inline-block text-white text-xs px-1 py-0.5 rounded-[2px] bg-pink-600`}
                                    >
                                        30 chapter
                                    </div>
                                    <h2 className='text-4xl font-semibold mt-3'>Wow người đọc</h2>
                                    <p className='text-white/70 mt-1'>Đang viết</p>
                                    <div className='mt-3 flex items-end gap-x-2'>
                                        <div className='flex items-end text-2xl'>
                                            <Star color='#FBBF24' fill='#FBBF24' />
                                            <p className='pl-1 font-semibold leading-5'>5</p>
                                        </div>
                                        <div className='w-[1px] bg-gray-300 h-3'></div>
                                        <p className='text-xs leading-3 text-white/50'>37.6k đánh giá</p>
                                    </div>
                                    <div className='max-w-3xl text-white/80 mt-3'>
                                        <p className='text-white font-semibold py-1'>Nội dung</p>
                                        <div className='text-sm leading-6 font-light line-clamp-2'>
                                            Từ khi ra đời năm 1999 đến khi được Amazon mua lại vào năm 2009, Zappos luôn
                                            giữ vững tinh thần kinh doanh đột phá và nhân viên sáng tạo triệt để. Zappos
                                            đã tồn tại và phát triển trước sự ngỡ ngàng của giới doanh nhân toàn cầu. Họ
                                            đã làm như thế nào để đạt được điều đó? Trong Trải nghiệm WOW, nhân viên từ
                                            mọi bộ phận của Zappos sẽ chia sẻ những câu chuyện cũng như bài học mà họ có
                                            được từ việc cung cấp dịch vụ khách hàng bằng cả trái tim. Cho dù bạn là
                                            khách hàng, nhân viên, lãnh đạo doanh nghiệp, cổ đông, doanh nhân hay độc
                                            giả tình cờ, cuốn sách này sẽ cho bạn thấy việc dẫn dắt và lan tỏa cảm xúc
                                            tích cực tại nơi làm việc có thể thay đổi doanh nghiệp, cộng đồng của bạn và
                                            cuộc sống của bạn như thế nào.
                                        </div>
                                    </div>
                                    <div className='flex gap-x-8 text-sm mt-3'>
                                        <div>
                                            <p className='text-white/60 font-light'>Ngày xuất bản</p>
                                            <p className='font-bold mt-1'>10/02/2024</p>
                                        </div>
                                        <div>
                                            <p className='text-white/60 font-light'>Thể loại</p>
                                            <p className='font-bold mt-1'>Tiểu thuyết</p>
                                        </div>
                                        <div>
                                            <p className='text-white/60 font-light'>Quốc gia</p>
                                            <p className='font-bold mt-1'>Việt Nam</p>
                                        </div>
                                        <div>
                                            <p className='text-white/60 font-light'>Tác giả</p>
                                            <p className='font-bold mt-1'>Nguyễn Văn Ánh</p>
                                        </div>
                                    </div>
                                    <div className='mt-5 flex gap-4'>
                                        <Button
                                            variant={'outline'}
                                            className='border-white bg-transparent px-8 rounded-full cursor-pointer'
                                        >
                                            <BookOpen />
                                            Đọc ngay
                                        </Button>
                                        <Button
                                            variant={'outline'}
                                            className='border-white bg-transparent px-8 rounded-full cursor-pointer'
                                        >
                                            <Play />
                                            Nghe sách
                                        </Button>
                                        <Button
                                            variant={'secondary'}
                                            size={'icon'}
                                            className='rounded-full cursor-pointer'
                                        >
                                            <ArrowDownToLine />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className='absolute inset-0 bg-cover h-full bg-[right_-200px_top] bg-no-repeat'
                        style={{
                            backgroundImage:
                                'url(https://cinema.momocdn.net/img/32033864513020595-first-look-mai-1701162316.jpg)'
                        }}
                    ></div>
                </div>
                <div className='max-w-screen-lg mx-auto mt-12 mb-8'>
                    <div className='grid grid-cols-3 gap-x-8'>
                        <div className='col-span-2'>
                            <div>
                                <h3 className='text-xl font-semibold uppercase'>Danh sách Chương</h3>
                                <div className='py-4 max-h-96 overflow-y-auto space-y-1 custom-scrollbar'>
                                    <div className='flex items-center justify-between'>
                                        <Link className='hover:underline hover:text-pink-600' href=''>Chương 1</Link>
                                        <div>
                                            <Button variant={'ghost'} className='h-auto !p-1'>
                                                <Volume2 />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <Link className='hover:underline hover:text-pink-600' href=''>Chương 1</Link>
                                        <div>
                                            <Button variant={'ghost'} className='h-auto !p-1'>
                                                <Volume2 />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <Link className='hover:underline hover:text-pink-600' href=''>Chương 1</Link>
                                        <div>
                                            <Button variant={'ghost'} className='h-auto !p-1'>
                                                <Volume2 />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <Link className='hover:underline hover:text-pink-600' href=''>Chương 1</Link>
                                        <div>
                                            <Button variant={'ghost'} className='h-auto !p-1'>
                                                <Volume2 />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className='text-xl font-semibold uppercase'>Tóm tắt</h3>
                                <div></div>
                            </div>
                            <div>
                                <h3 className='text-xl font-semibold uppercase'>Họp Chợ</h3>
                                <div></div>
                            </div>
                        </div>
                        <div className='col-span-1 ml-8'>
                            <h2 className='text-xl font-semibold uppercase'>Có thể bạn quan tâm</h2>
                            <div className='mt-4'>
                                <Ebook />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
