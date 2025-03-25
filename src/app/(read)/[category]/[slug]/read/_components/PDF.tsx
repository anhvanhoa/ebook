'use client';
import React, { memo, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css'; // Ẩn lớp chọn văn bản
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Ẩn chú thích
import Loading from './Loading';
import { usePdf } from '@/provider/pdf/content';
import { cn } from '@/lib/utils';
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
    const pageSlide = useMemo(
        () => Array.from({ length: pdt.state.totalPages }, (_, i) => i + 1),
        [pdt.state.totalPages]
    );
    return (
        <Document
            file={pdt.state.fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            loading={<Loading />}
            className={cn('grid', {
                'grid-cols-[auto_auto]': pdt.state.viewMode === 'double'
            })}
        >
            {pageSlide.map((el) => (
                <Page
                
                    key={`page_${el}`}
                    loading={<Loading />}
                    devicePixelRatio={2}
                    className={cn('flex transition-all w-full', {
                        'justify-end': pdt.state.viewMode === 'double' && el % 2 !== 0,
                        'justify-center': pdt.state.viewMode === 'single'
                    })}
                    pageNumber={el}
                    width={pdt.state.width}
                    height={pdt.state.height}
                    scale={pdt.state.scale}
                />
            ))}
        </Document>
    );
};

export default memo(PdfViewer);
