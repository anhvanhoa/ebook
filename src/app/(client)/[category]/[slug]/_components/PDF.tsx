'use client';
import { useContext, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css'; // Ẩn lớp chọn văn bản
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Ẩn chú thích
import { EbookContext } from '../page';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/'
};

type PageSider = number[];

const PdfViewer = () => {
    const pdt = useContext(EbookContext);
    const [scale] = useDebounce(pdt.state.scale, 200);
    const [pageSlide, setPageSlide] = useState<PageSider>([]);
    function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }) {
        const slider = Array.from({ length: nextNumPages }, (_, i) => i + 1);
        setPageSlide(slider);
    }
    return (
        <div>
            <Document file={pdt.state.fileUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                {pageSlide.map((el) => (
                    <div key={`page_${el}`}>
                        <Page
                            devicePixelRatio={2}
                            className={'*:!mx-auto'}
                            pageNumber={el}
                            width={pdt.state.width}
                            height={pdt.state.height}
                            scale={scale}
                        />
                    </div>
                ))}
            </Document>
        </div>
    );
};

export default PdfViewer;
