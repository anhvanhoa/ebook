'use client';
import Heading from '@/components/heading';
import { usePdf } from '@/provider/pdf/context';
import Image from 'next/image';
import React from 'react';
import { useDebounce } from 'use-debounce';

type ImgViewerProps = {
    title?: string;
};

const ImgViewer = ({ title }: ImgViewerProps) => {
    const pdf = usePdf();
    const [scale] = useDebounce(pdf.state.scale, 250);
    return (
        <div className='mx-auto'>
            {title && <Heading title={title} />}
            {pdf.state.images.map((img) => (
                <Image
                    key={img.id}
                    src={img.url}
                    alt={img.alt}
                    width={pdf.state.width * scale}
                    height={pdf.state.height * scale}
                    className='mx-auto border-x'
                />
            ))}
        </div>
    );
};

export default ImgViewer;
