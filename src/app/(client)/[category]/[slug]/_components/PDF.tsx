'use client';
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css'; // Ẩn lớp chọn văn bản
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Ẩn chú thích
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/'
};

type PageSider = {
    pageOdds: number[];
    pageEvens: number[];
};

const PdfViewer = ({ fileUrl }: { fileUrl: string }) => {
    const [pageSlide, setPageSlide] = useState<PageSider>({ pageOdds: [], pageEvens: [] });
    function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }) {
        const slider = Array.from({ length: nextNumPages }, (_, i) => i).reduce<PageSider>(
            (acc, el) => {
                if (el % 2 === 0) {
                    acc.pageOdds.push(el);
                } else {
                    acc.pageEvens.push(el);
                }
                return acc;
            },
            {
                pageOdds: [],
                pageEvens: []
            }
        );
        setPageSlide(slider);
    }
    return (
        <div>
            {/* <Document className={'w-full'} file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        className='*:!w-full *:!h-full'
                        // _className='w-full'
                        // className={'w-full'}
                        // width={containerWidth ? Math.min(containerWidth, 500) : 500}
                    />
                ))}
            </Document> */}
            <Carousel>
                <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                    <CarouselContent>
                        {pageSlide.pageOdds.length > 0 &&
                            pageSlide.pageOdds.map((el) => (
                                <CarouselItem key={`page_${el + 1}`}>
                                    <div className={'grid grid-cols-2 ' + el}>
                                        <Page pageNumber={el + 1} className='*:!w-full *:!h-full' />
                                        {/* <Page pageNumber={el + 2} className='*:!w-full *:!h-full' /> */}
                                    </div>
                                </CarouselItem>
                            ))}
                    </CarouselContent>
                </Document>
            </Carousel>
        </div>
    );
};

export default PdfViewer;
