'use client';
import { usePdf } from '@/provider/pdf/context';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { EpubView, ReactReader } from 'react-reader';

const EpubViewer = () => {
    const pdf = usePdf();
    const ref = useRef<EpubView>(null);
    const [location, setLocation] = useState<string | number>(0);
    // const [rendition, setRendition] = useState(null); // Lưu rendition để chỉnh iframe

    const style = useMemo(() => ({
        width: pdf.state.isMobile ? '100vw' : pdf.state.width * pdf.state.scale
    }), [pdf.state.isMobile, pdf.state.width, pdf.state.scale]);

    // // Cập nhật body của iframe khi EPUB load xong
    // useEffect(() => {
    //     if (!rendition) return;
    //     rendition.hooks.content.register((contents) => {
    //         const iframe = contents.window.frameElement;
    //         if (iframe) {
    //             const body = contents.document.body;
    //             if (body) {
    //                 body.style.width = style.width;
    //                 body.style.transition = 'width 0.3s ease';
    //             }
    //         }
    //     });

    //     rendition.display();
    // }, [rendition, style.width]);

    return (
        <div className="overflow-x-auto h-[calc(100vh-2.75rem)] custom-scrollbar mx-auto" style={style}>
            {pdf.state.fileUrl && (
                <ReactReader
                    url={pdf.state.fileUrl}
                    location={location}
                    epubOptions={{
                        spread: 'none',
                        flow: 'paginated'
                    }}
                    ref={ref}
                    // getRendition={(rend) => setRendition(rend)} // Lưu rendition để dùng trong useEffect
                    locationChanged={(epubcfi: string) => setLocation(epubcfi)}
                />
            )}
        </div>
    );
};

export default EpubViewer;
