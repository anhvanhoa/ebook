'use client';
import { useState } from 'react';
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
            <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                {pageSlide.pageOdds.length > 0 &&
                    pageSlide.pageOdds.map((el) => (
                        <div key={`page_${el + 1}`} className={'grid grid-cols-1 ' + el}>
                            <Page
                                pageNumber={el + 1}
                                className='*:!w-full *:!h-full'
                                width={512}
                                scale={2}
                            />
                            <Page
                                pageNumber={el + 2}
                                className='*:!w-full *:!h-full'
                                width={512}
                                scale={2}
                            />
                        </div>
                    ))}
            </Document>
        </div>
    );
};

export default PdfViewer;
