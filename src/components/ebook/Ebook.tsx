import images from '@/asset/images';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type EbookProps = {
    title: string;
    slug: string;
    category?: string;
    image?: string | null;
    className?: string;
};

const Ebook = ({ category, image, slug, title, className }: EbookProps) => {
    return (
        <Link href={`/${slug}`} className={cn('flex items-center justify-center flex-col group', className)}>
            <div className='rounded-md bg-gray-50 dark:bg-gray-700 p-1.5'>
                <Image
                    className='aspect-[4/6] object-cover rounded-md grayscale hover:grayscale-50 duration-500 transition'
                    src={image ?? images.ebookDefault}
                    width={180}
                    height={300}
                    alt={title}
                />
            </div>
            <div className='px-2 py-2 text-center'>
                <h2 className='line-clamp-1 group-hover:underline text-sm sm:text-base underline-offset-1 decoration-1 font-medium'>
                    {title}
                </h2>
                <p className='text-xs sm:text-sm italic'>{category}</p>
            </div>
        </Link>
    );
};

export default Ebook;
