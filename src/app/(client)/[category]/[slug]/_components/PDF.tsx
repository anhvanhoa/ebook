'use client';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css'; // Ẩn lớp chọn văn bản
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Ẩn chú thích
import { useCallback } from 'react';
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/'
};

// const maxWidth = 400;

const PdfViewer = ({ fileUrl }: { fileUrl: string }) => {
    const [file, setFile] = useState('/ebook.pdf');
    const [numPages, setNumPages] = useState();
    const [containerRef, setContainerRef] = useState(null);
    const [containerWidth, setContainerWidth] = useState();

    const onResize = useCallback((entries) => {
        const [entry] = entries;

        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    function onFileChange(event) {
        const { files } = event.target;

        const nextFile = files?.[0];

        if (nextFile) {
            setFile(nextFile);
        }
    }

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }

    return (
        <div>
            <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        // className={'w-full'}
                        // width={containerWidth ? Math.min(containerWidth, 500) : 500}
                    />
                ))}
            </Document>
        </div>
    );
};

export default PdfViewer;
