'use client';
import 'core-js/full/promise/with-resolvers';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css'; // Ẩn lớp chọn văn bản
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Ẩn chú thích
import Loading from './Loading';
import { usePdf } from '@/provider/pdf/context';
import { cn } from '@/lib/utils';
import { useDebounce } from 'use-debounce';
import { DocumentCallback, OnItemClickArgs } from 'react-pdf/dist/esm/shared/types.js';
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

class Ref {
    num: number;
    gen: number;

    constructor({ num, gen }: { num: number; gen: number }) {
        this.num = num;
        this.gen = gen;
    }

    toString(): string {
        let str = `${this.num}R`;
        if (this.gen !== 0) {
            str += this.gen;
        }
        return str;
    }
}

const options = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    standardFontDataUrl: '/standard_fonts/'
};

const PdfViewer = () => {
    const pdf = usePdf();
    const viewerRef = React.useRef<HTMLDivElement>(null);
    const [scale] = useDebounce(pdf.state.scale, 250);
    async function onDocumentLoadSuccess(e: DocumentCallback) {
        console.log(e.getPageIndex(new Ref({ num: 23, gen: 0 })));
        console.log(e.getOutline());
        pdf.setState({ ...pdf.state, totalPages: e.numPages });
    }
    const handleGoPageByTOF = (e: OnItemClickArgs) => {
        pdf.setState((state) => {
            return {
                ...state,
                pageNumber: e.pageNumber
            };
        });
        // Cuộn đến đầu của viewport
        if (viewerRef.current) {
            viewerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    return (
        <div ref={viewerRef} className='overflow-x-auto h-[calc(100vh-2.75rem)] custom-scrollbar shadow-md'>
            <Document
                file={pdf.state.fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
                loading={<Loading />}
                onItemClick={handleGoPageByTOF}
                className={cn('grid', {
                    'grid-cols-[auto_3px_auto]': pdf.state.viewMode === 'double'
                })}
            >
                <div
                    className={cn('grid relative', {
                        'justify-center': pdf.state.viewMode === 'single',
                        'justify-end': pdf.state.viewMode === 'double'
                    })}
                >
                    <Page
                        loading={<Loading className='w-screen' />}
                        devicePixelRatio={2}
                        pageNumber={pdf.state.pageNumber}
                        width={pdf.state.width}
                        scale={scale}
                    >
                        <div className='flex justify-center sticky bottom-2 z-10'>
                            <p className='rounded-3xl text-xs px-2.5 py-1 bg-gray-50/10 backdrop-blur-md'>
                                {pdf.state.pageNumber} / {pdf.state.totalPages}
                            </p>
                        </div>
                    </Page>
                </div>
                {pdf.state.viewMode === 'double' && pdf.state.pageNumber + 1 <= pdf.state.totalPages && (
                    <>
                        <div className='bg-gray-50'></div>
                        <div className='grid relative justify-start'>
                            <Page
                                loading={<Loading />}
                                devicePixelRatio={2}
                                pageNumber={pdf.state.pageNumber + 1}
                                width={pdf.state.width}
                                scale={scale}
                            >
                                <div className='flex justify-center sticky bottom-2'>
                                    <p className='rounded-3xl text-xs px-2.5 py-1 bg-gray-50/10 backdrop-blur-md'>
                                        {pdf.state.pageNumber + 1} / {pdf.state.totalPages}
                                    </p>
                                </div>
                            </Page>
                        </div>
                    </>
                )}
            </Document>
        </div>
    );
};

export default PdfViewer;
