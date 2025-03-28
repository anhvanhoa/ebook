import { Button } from '@/components/ui/button';
import { ArrowDownToLine, BookOpen, ChevronLeft, Play, Volume2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Ebook from './_components/Ebook';
import Link from 'next/link';
import Review from './_components/Review';

const res = {
    title: 'Wow người đọc',
    slug: 'wow-nguoi-doc',
    categories: ['Tiểu thuyết', 'Tâm lý'],
    image: '/images/ebook.webp',
    chapter: 30,
    chapters: [
        {
            id: 1,
            title: 'Chương 1',
            content: 'Chương 1: Ngày đầu tiên đi học',
            sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            link: '/wow-nguoi-doc/chuong-1'
        },
        {
            id: 2,
            title: 'Chương 2',
            content: 'Chương 2: Ngày thứ hai đi học',
            sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            link: '/wow-nguoi-doc/chuong-2'
        }
    ],
    status: 'Đang viết tiếp',
    rating: 3,
    published: '10/02/2024',
    author: {
        name: 'Nguyễn Văn Ánh'
    },
    createdBy: {
        name: 'Nguyễn Văn B'
    },
    nation: 'Việt Nam',
    description:
        'Từ khi ra đời năm 1999 đến khi được Amazon mua lại vào năm 2009, Zappos luôn giữ vững tinh thần kinh doanh đột phá và nhân viên sáng tạo triệt để. Zappos đã tồn tại và phát triển trước sự ngỡ ngàng của giới doanh nhân toàn cầu. Họ đã làm như thế nào để đạt được điều đó? Trong Trải nghiệm WOW, nhân viên từ mọi bộ phận của Zappos sẽ chia sẻ những câu chuyện cũng như bài học mà họ có được từ việc cung cấp dịch vụ khách hàng bằng cả trái tim. Cho dù bạn là khách hàng, nhân viên, lãnh đạo doanh nghiệp, cổ đông, doanh nhân hay độc giả tình cờ, cuốn sách này sẽ cho bạn thấy việc dẫn dắt và lan tỏa cảm xúc tích cực tại nơi làm việc có thể thay đổi doanh nghiệp, cộng đồng của bạn và cuộc sống của bạn như thế nào.',
    summary:
        '<p>Tom Đánh cá không thể ngờ được có ngày anh lại bị chỉ định làm kẻ tội phạm.</p><p>Chuyện xảy ra vào buổi sáng. Mặt trời to màu đỏ vừa nhô lên khỏi đường chân trờicùng với người bạn đồng hành màu vàng nhỏ bé lê bước theo nó. Một ngôi làng xinhxắn, ngăn nắp – cái chấm trắng kì dị giữa khoảng không xanh rờn của hành tinh –ánh lên dưới tia nắng hè của hai mặt trời của nó. </p> <p> Tom vừa thức dậy trong căn nhà nhỏ của anh. Đó là một thanh niên cao lớn với nước da rám đỏ vì mặt trời, với đuôi mắt dài thừa hưởng từ người cha và tính nết thật thà không muốn mua việc vào người thừa hưởng từ người mẹ. Tom không vội: từ nay đến khi có những trận mưa thu người ta không đi đánh cá, nghĩa là với người đánh cá chưa có công việc gì thực sự phải làm. Từ giờ đến mùa thu anh có ý định dềnh dàng một chút và sửa chữa lại mấy cái đồ nghề đánh cá.</p>'
};

const page = () => {
    return (
        <div>
            <div className='relative bg-black'>
                <div className='relative z-10 text-white inset-0 from-black/50 to-black to-80% bg-gradient-to-l px-4'>
                    <div className='max-w-screen-lg mx-auto'>
                        <div className='flex items-start md:flex-row flex-col h-full py-10 md:py-12'>
                            <div className='shrink-0'>
                                <Image
                                    className='w-32 sm:w-36 md:w-64 aspect-[4/6] rounded-md'
                                    src={res.image}
                                    alt={res.title}
                                    width={300}
                                    height={500}
                                />
                            </div>
                            <div className='md:ml-10 mt-8 md:mt-0'>
                                <p
                                    className={`font-medium inline-block text-white text-xs px-1 py-0.5 rounded-[2px] bg-pink-600`}
                                >
                                    {res.chapter} chương
                                </p>
                                <h2 className='text-2xl sm:text-3xl md:text-5xl font-semibold mt-3'>{res.title}</h2>
                                <p className='text-white/70 mt-1'>{res.status}</p>
                                <div className='mt-3 flex items-end gap-x-2'>
                                    <p className='text-xs leading-3 text-white/50'>37.6k lượt xem</p>
                                    <div className='w-[1px] bg-gray-300 h-3'></div>
                                    <p className='text-xs leading-3 text-white/50'>37.6k thích</p>
                                    <div className='w-[1px] bg-gray-300 h-3'></div>
                                    <p className='text-xs leading-3 text-white/50'>37.6k theo dõi</p>
                                </div>
                                <div className='max-w-3xl text-white/80 mt-3'>
                                    <p className='text-white font-semibold py-1'>Nội dung</p>
                                    <div className='text-sm leading-6 font-light line-clamp-2'>{res.description}</div>
                                </div>
                                <div className='flex gap-x-8 gap-y-3 text-sm mt-3 flex-wrap'>
                                    <div className='shrink-0'>
                                        <p className='text-white/60 font-light'>Ngày xuất bản</p>
                                        <p className='font-semibold mt-1'>{res.published}</p>
                                    </div>
                                    <div className='shrink-0'>
                                        <p className='text-white/60 font-light'>Thể loại</p>
                                        <p className='font-semibold mt-1'>{res.categories.join(', ')}</p>
                                    </div>
                                    <div className='shrink-0'>
                                        <p className='text-white/60 font-light'>Quốc gia</p>
                                        <p className='font-semibold mt-1'>{res.nation}</p>
                                    </div>
                                    <div className='shrink-0'>
                                        <p className='text-white/60 font-light'>Tác giả</p>
                                        <p className='font-semibold mt-1'>{res.author.name}</p>
                                    </div>
                                    <div className='shrink-0'>
                                        <p className='text-white/60 font-light'>Nguồn</p>
                                        <p className='font-bold mt-1'>{res.createdBy.name}</p>
                                    </div>
                                </div>
                                <div className='mt-5 flex gap-4'>
                                    <Button
                                        variant={'outline'}
                                        className='text-xs sm:text-sm border-pink-600 bg-pink-600 hover:bg-pink-600/90 hover:text-white px-8 rounded-full cursor-pointer'
                                    >
                                        <BookOpen />
                                        Đọc ngay
                                    </Button>
                                    <Button
                                        variant={'outline'}
                                        className='text-xs sm:text-sm border-white bg-transparent px-8 rounded-full cursor-pointer'
                                    >
                                        <Play />
                                        Nghe sách
                                    </Button>
                                    <Button variant={'secondary'} size={'icon'} className='rounded-full cursor-pointer'>
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
            <div className='max-w-screen-lg mx-auto mt-12 mb-8 px-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8'>
                        <div className='col-span-2 space-y-4'>
                            {res.chapters.length !== 0 && (
                                <div>
                                    <h3 className='text-lg font-semibold uppercase'>Danh sách Chương</h3>
                                    <div className='py-2 max-h-96 overflow-y-auto space-y-1 custom-scrollbar px-2'>
                                        {res.chapters.map((chapter) => (
                                            <div key={chapter.id} className='flex items-center justify-between'>
                                                <Link
                                                    className='text-sm hover:underline hover:text-pink-600'
                                                    href={chapter.link}
                                                >
                                                    {chapter.title}
                                                </Link>
                                                <div>
                                                    <Button variant={'ghost'} className='h-auto !p-1'>
                                                        <Volume2 />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div>
                                <h3 className='text-lg font-semibold uppercase'>Tóm tắt</h3>
                                <div
                                    className='px-2 text-sm py-2 space-y-2'
                                    dangerouslySetInnerHTML={{ __html: res.summary }}
                                ></div>
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold uppercase'>Họp Chợ</h3>
                                <div>
                                    <Review />
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 mt-4 md:mt-0'>
                            <h2 className='text-lg font-semibold uppercase'>Có thể bạn quan tâm</h2>
                            <div className='mt-4'>
                                <Ebook />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default page;
