import { Button } from '@/components/ui/button';
import { BookOpen, ChevronDown, Play } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Ebook from './_components/Ebook';
import Link from 'next/link';
import apiEbook from '@/api/ebook';
import images from '@/asset/images';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Review from './_components/Review';
import Comment from './_components/Comment';

type DetailPageProps = {
    params: Promise<{ category: string; slug: string }>;
};

const DetailPage = async (props: DetailPageProps) => {
    const params = await props.params;
    const ebook = await apiEbook.getEbookPageDetail(params);
    const suggestionEbooks = await apiEbook.getEbookSuggestion([params.slug]);
    if (!ebook) notFound();
    return (
        <div>
            <div className='relative bg-black'>
                <div className='relative z-10 text-white inset-0 from-black/50 to-black to-80% bg-gradient-to-l px-4'>
                    <div className='max-w-screen-lg mx-auto'>
                        <div className='flex items-start md:flex-row flex-col h-full py-10 md:py-12'>
                            <div className='shrink-0'>
                                <Image
                                    className='w-32 sm:w-36 md:w-52 aspect-[4/6] rounded-md'
                                    src={ebook.coverImage ?? images.ebookDefault}
                                    alt={ebook.title}
                                    width={300}
                                    height={500}
                                />
                            </div>
                            <div className='md:ml-10 mt-8 md:mt-0'>
                                {ebook.series.length > 0 && (
                                    <p
                                        className={`font-medium inline-block text-white text-xs px-1 py-0.5 rounded-[2px] bg-pink-600`}
                                    >
                                        {ebook.series.length} phần
                                    </p>
                                )}
                                <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold mt-3'>{ebook.title}</h2>
                                <div className='mt-3 flex items-end gap-x-2'>
                                    <p className='text-xs leading-3 text-white/50'>{ebook.views} lượt xem</p>
                                    <div className='w-[1px] bg-gray-300 h-3'></div>
                                    <p className='text-xs leading-3 text-white/50'>{ebook.likes.length} thích</p>
                                    <div className='w-[1px] bg-gray-300 h-3'></div>
                                    <p className='text-xs leading-3 text-white/50'>{ebook.follows.length} theo dõi</p>
                                </div>
                                <div className='max-w-3xl text-white/80 mt-3'>
                                    <p className='text-white font-semibold py-1'>Nội dung</p>
                                    <div className='text-sm leading-6 font-light line-clamp-2'>{ebook.description}</div>
                                </div>
                                <div className='flex gap-x-8 gap-y-3 text-sm mt-3 flex-wrap'>
                                    <div className='shrink-0'>
                                        <p className='text-white/60 font-light'>Ngày xuất bản</p>
                                        <p className='font-semibold mt-1'>
                                            {ebook.publishedDate
                                                ? format(ebook.publishedDate, 'P', { locale: vi })
                                                : 'Không xác định'}
                                        </p>
                                    </div>
                                    <div className='shrink-0'>
                                        <p className='text-white/60 font-light'>Thể loại</p>
                                        <p className='font-semibold mt-1'>
                                            {ebook.categories.map((c) => c.category.name).join(', ')}
                                        </p>
                                    </div>
                                    {ebook.language && (
                                        <div className='shrink-0'>
                                            <p className='text-white/60 font-light'>Quốc gia</p>
                                            <p className='font-semibold mt-1'>{ebook.language}</p>
                                        </div>
                                    )}
                                    <div className='shrink-0'>
                                        <p className='text-white/60 font-light'>Tác giả</p>
                                        <p className='font-semibold mt-1'>{ebook.author?.penName}</p>
                                    </div>
                                    <div className='shrink-0'>
                                        <p className='text-white/60 font-light'>Nguồn</p>
                                        <p className='font-semibold mt-1'>{ebook.source ?? 'Không xác định'}</p>
                                    </div>
                                </div>
                                <div className='mt-5 flex gap-4'>
                                    <Link href={`/${params.category}/${params.slug}/read`}>
                                        <Button
                                            variant={'outline'}
                                            className='text-xs sm:text-sm border-pink-600 bg-pink-600 hover:bg-pink-600/90 hover:text-white px-8 rounded-full cursor-pointer'
                                        >
                                            <BookOpen />
                                            Đọc ngay
                                        </Button>
                                    </Link>
                                    {ebook.voices.length !== 0 && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className='text-xs sm:text-sm border-white bg-transparent px-8 rounded-full cursor-pointer'
                                                >
                                                    <Play />
                                                    Nghe sách
                                                    <ChevronDown className='size-3' />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {ebook.voices.map((voice) => (
                                                    <DropdownMenuItem key={voice.id}>{voice.name}</DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='absolute inset-0 bg-cover h-full bg-[right_-200px_top] bg-no-repeat'
                    style={{
                        backgroundImage: `url(${ebook.coverImage})`
                    }}
                ></div>
            </div>
            <div className='max-w-screen-lg mx-auto mt-12 mb-8 px-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8'>
                    <div className='col-span-2 space-y-4'>
                        {ebook.series.length !== 0 && (
                            <div>
                                <h3 className='text-lg font-semibold uppercase'>Danh sách phần</h3>
                                <div className='py-2 max-h-96 overflow-y-auto space-y-1 custom-scrollbar px-2'>
                                    {ebook.series.map((chapter, i) => (
                                        <div
                                            key={chapter.id}
                                            className='flex items-center text-sm hover:underline hover:text-pink-600'
                                        >
                                            <span>{i + 1}.</span>
                                            <span className='w-1'></span>
                                            <Link className='' href={chapter.ebook.slug}>
                                                {chapter.ebook.title}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {ebook.summary && (
                            <div>
                                <h3 className='text-lg font-semibold uppercase'>Tóm tắt</h3>
                                <div
                                    className='px-2 text-sm py-2 space-y-2'
                                    dangerouslySetInnerHTML={{ __html: ebook.summary }}
                                ></div>
                            </div>
                        )}
                        <div>
                            <h3 className='text-lg font-semibold uppercase'>Họp Chợ</h3>
                            <div className='py-3'>
                                <Review
                                    comment={{
                                        content: 'Sách hay quá, cảm ơn tác giả đã viết ra cuốn sách này',
                                        id: '1',
                                        name: 'Bùi Lon Di',
                                        time: '1 giờ trước'
                                    }}
                                />
                                {/* <p className='text-sm text-center py-2 text-primary/60'>Đang phát triển</p> */}
                            </div>
                            <Comment />
                        </div>
                    </div>
                    <div className='col-span-1 mt-4 md:mt-0'>
                        <h2 className='text-lg font-semibold uppercase'>Có thể bạn quan tâm</h2>
                        <div className='mt-4'>
                            {suggestionEbooks.length === 0 && (
                                <p className='text-sm text-center py-2 text-primary/60'>Không có sách nào</p>
                            )}
                            {suggestionEbooks.length > 0 && (
                                <div>
                                    {suggestionEbooks.map((item) => (
                                        <Ebook
                                            key={item.id}
                                            category={item.categories.map((cat) => cat.category.name).join(', ')}
                                            image={item.coverImage}
                                            slug={`${params.slug}/${item.slug}`}
                                            view={item.views}
                                            author={item.author?.penName}
                                            title={item.title}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
