'use client';
import 'core-js/full/promise/with-resolvers';
import React, { memo, useEffect, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css'; // Ẩn lớp chọn văn bản
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Ẩn chú thích
import Loading from './Loading';
import { usePdf } from '@/provider/pdf/context';
import { cn } from '@/lib/utils';
import { debounce } from 'lodash';
// import { useDebounce } from 'use-debounce';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/'
};

const PdfViewer = () => {
    const pdt = usePdf();
    function onDocumentLoadSuccess(e: { numPages: number }) {
        console.log(e);
        pdt.setState({ ...pdt.state, totalPages: e.numPages });
    }
    // const pageSlide = useMemo(
    //     () => Array.from({ length: pdt.state.totalPages }, (_, i) => i + 1),
    //     [pdt.state.totalPages]
    // );
    return (
        <Document
            file={pdt.state.fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            loading={<Loading />}
            className={cn('grid', {
                'grid-cols-[auto_3px_auto]': pdt.state.viewMode === 'double'
            })}
        >
            <div
                className={cn('grid relative', {
                    'justify-center': pdt.state.viewMode === 'single',
                    'justify-end': pdt.state.viewMode === 'double'
                })}
            >
                <Page
                    loading={<Loading />}
                    devicePixelRatio={2}
                    pageNumber={pdt.state.pageNumber}
                    width={pdt.state.width * pdt.state.scale}
                    scale={pdt.state.scale}
                >
                    <div className='flex justify-center sticky bottom-2'>
                        <p className='rounded-3xl text-xs px-2.5 py-1 bg-gray-50/10 backdrop-blur-md'>
                            {pdt.state.pageNumber} / {pdt.state.totalPages}
                        </p>
                    </div>
                </Page>
            </div>
            {pdt.state.viewMode === 'double' && pdt.state.pageNumber + 1 <= pdt.state.totalPages && (
                <>
                    <div className='bg-gray-50'></div>
                    <div className='grid relative justify-start'>
                        <Page
                            loading={<Loading />}
                            devicePixelRatio={2}
                            pageNumber={pdt.state.pageNumber + 1}
                            width={pdt.state.width * pdt.state.scale}
                            scale={pdt.state.scale}
                        >
                            <div className='flex justify-center sticky bottom-2'>
                                <p className='rounded-3xl text-xs px-2.5 py-1 bg-gray-50/10 backdrop-blur-md'>
                                    {pdt.state.pageNumber + 1} / {pdt.state.totalPages}
                                </p>
                            </div>
                        </Page>
                    </div>
                </>
            )}
        </Document>
    );
};

export default memo(PdfViewer);
