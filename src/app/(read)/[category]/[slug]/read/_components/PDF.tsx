'use client';
import 'core-js/full/promise/with-resolvers';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css'; // Ẩn lớp chọn văn bản
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Ẩn chú thích
import Loading from './Loading';
import { usePdf } from '@/provider/pdf/context';
import { cn } from '@/lib/utils';
import { DocumentCallback, OnItemClickArgs } from 'react-pdf/dist/esm/shared/types.js';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/'
};

const PdfViewer = () => {
    const pdf = usePdf();
    const viewerRef = React.useRef<HTMLDivElement>(null);

    async function onDocumentLoadSuccess(e: DocumentCallback) {
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
                        onDoubleClick={() => console.log('double click')}
                        loading={<Loading className='w-screen' />}
                        devicePixelRatio={2}
                        pageNumber={pdf.state.pageNumber}
                        width={pdf.state.width * pdf.state.scale}
                        scale={pdf.state.scale}
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
                                width={pdf.state.width * pdf.state.scale}
                                scale={pdf.state.scale}
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
