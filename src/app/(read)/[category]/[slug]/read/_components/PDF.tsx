'use client';
import React from 'react';
import { useDebounce } from 'use-debounce';
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
    const [scale] = useDebounce(pdt.state.scale, 200);
    function onDocumentLoadSuccess(e: { numPages: number }) {
        console.log(e);
        pdt.setState({ ...pdt.state, totalPages: e.numPages });
    }
    const pageSlide = Array.from({ length: pdt.state.totalPages }, (_, i) => i + 1);
    return (
        <Document
            file={pdt.state.fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            loading={<Loading />}
            className={'grid grid-cols-2'}
        >
            {pageSlide.map((el) => (
                <Page
                    key={`page_${el}`}
                    loading={<Loading />}
                    devicePixelRatio={2}
                    className={cn('*:!mx-auto transition-all w-full')}
                    pageNumber={el}
                    width={pdt.state.width * scale}
                    height={pdt.state.height}
                    scale={scale}
                />
            ))}
        </Document>
    );
};

export default PdfViewer;
