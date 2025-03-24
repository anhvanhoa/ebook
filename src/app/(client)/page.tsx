import Image from 'next/image';
import Heading from './_components/Heading';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <Heading />
            <div className='max-w-screen-lg mx-auto'>
                <div className='py-2 grid grid-cols-5 gap-x-2 gap-y-6'>
                    <Link href={'/'} className='flex items-center justify-center flex-col group'>
                        <div className='rounded-md bg-gray-50 p-1.5'>
                            <Image
                                className='aspect-[4/6] object-cover rounded-md grayscale hover:grayscale-50 transition-all'
                                src='/images/ebook.webp'
                                width={180}
                                height={300}
                                alt='ebook'
                            />
                        </div>
                        <div className='px-2 py-2'>
                            <h2 className='line-clamp-1 group-hover:underline underline-offset-1 decoration-1'>
                                Lorem ipsum dolor sit amet consectetur.
                            </h2>
                            <p className='text-sm italic'>Tiểu thuyết</p>
                        </div>
                    </Link>
                    <Link href={'/'} className='flex items-center justify-center flex-col group'>
                        <div className='rounded-md bg-gray-50 p-1.5'>
                            <Image
                                className='aspect-[4/6] object-cover rounded-md grayscale hover:grayscale-50 transition-all'
                                src='/images/ebook.webp'
                                width={180}
                                height={300}
                                alt='ebook'
                            />
                        </div>
                        <div className='px-2 py-2'>
                            <h2 className='line-clamp-1 group-hover:underline underline-offset-1 decoration-1'>
                                Lorem ipsum dolor sit amet consectetur.
                            </h2>
                            <p className='text-sm italic'>Tiểu thuyết</p>
                        </div>
                    </Link>
                    <Link href={'/'} className='flex items-center justify-center flex-col group'>
                        <div className='rounded-md bg-gray-50 p-1.5'>
                            <Image
                                className='aspect-[4/6] object-cover rounded-md grayscale hover:grayscale-50 transition-all'
                                src='/images/ebook.webp'
                                width={180}
                                height={300}
                                alt='ebook'
                            />
                        </div>
                        <div className='px-2 py-2'>
                            <h2 className='line-clamp-1 group-hover:underline underline-offset-1 decoration-1'>
                                Lorem ipsum dolor sit amet consectetur.
                            </h2>
                            <p className='text-sm italic'>Tiểu thuyết</p>
                        </div>
                    </Link>
                    <Link href={'/'} className='flex items-center justify-center flex-col group'>
                        <div className='rounded-md bg-gray-50 p-1.5'>
                            <Image
                                className='aspect-[4/6] object-cover rounded-md grayscale hover:grayscale-50 transition-all'
                                src='/images/ebook.webp'
                                width={180}
                                height={300}
                                alt='ebook'
                            />
                        </div>
                        <div className='px-2 py-2'>
                            <h2 className='line-clamp-1 group-hover:underline underline-offset-1 decoration-1'>
                                Lorem ipsum dolor sit amet consectetur.
                            </h2>
                            <p className='text-sm italic'>Tiểu thuyết</p>
                        </div>
                    </Link>
                    <Link href={'/'} className='flex items-center justify-center flex-col group'>
                        <div className='rounded-md bg-gray-50 p-1.5'>
                            <Image
                                className='aspect-[4/6] object-cover rounded-md grayscale hover:grayscale-50 transition-all'
                                src='/images/ebook.webp'
                                width={180}
                                height={300}
                                alt='ebook'
                            />
                        </div>
                        <div className='px-2 py-2'>
                            <h2 className='line-clamp-1 group-hover:underline underline-offset-1 decoration-1'>
                                Lorem ipsum dolor sit amet consectetur.
                            </h2>
                            <p className='text-sm italic'>Tiểu thuyết</p>
                        </div>
                    </Link>
                    <Link href={'/'} className='flex items-center justify-center flex-col group'>
                        <div className='rounded-md bg-gray-50 p-1.5'>
                            <Image
                                className='aspect-[4/6] object-cover rounded-md grayscale hover:grayscale-50 transition-all'
                                src='/images/ebook.webp'
                                width={180}
                                height={300}
                                alt='ebook'
                            />
                        </div>
                        <div className='px-2 py-2'>
                            <h2 className='line-clamp-1 group-hover:underline underline-offset-1 decoration-1'>
                                Lorem ipsum dolor sit amet consectetur.
                            </h2>
                            <p className='text-sm italic'>Tiểu thuyết</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
