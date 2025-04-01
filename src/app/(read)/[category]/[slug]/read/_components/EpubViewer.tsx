'use client';
import { usePdf } from '@/provider/pdf/context';
import React, { useLayoutEffect, useState } from 'react';
import { EpubView } from 'react-reader';
import { Rendition } from 'epubjs';
import Loading from './Loading';
import { useDebounce } from 'use-debounce';

const EpubViewer = () => {
    const pdf = usePdf();
    const [rendition, setRendition] = useState<Rendition | null>(null);
    const [location, setLocation] = useState<string | number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [scale] = useDebounce(pdf.state.scale, 300);
    useLayoutEffect(() => {
        let TimeID: NodeJS.Timeout;
        if (rendition) {
            console.log('location', rendition);
            setLoading(true);
            rendition.themes.fontSize(`${16 * scale}px`);
            rendition.display(String(location));
            TimeID = setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        return () => {
            clearTimeout(TimeID);
        };
    }, [scale, rendition, pdf.state.viewMode]);
    return (
        <div className='overflow-x-auto h-[calc(100vh-2.75rem)] custom-scrollbar relative'>
            {loading && (
                <div className='absolute w-full h-full bottom-0 z-50 bg-primary-foreground'>
                    <Loading />
                </div>
            )}
            {pdf.state.fileUrl && (
                <div
                    style={{ width: pdf.state.width * (pdf.state.viewMode === 'double' ? scale * 2 : scale) }}
                    className='h-full mx-auto'
                >
                    <EpubView
                        url={pdf.state.fileUrl}
                        location={location}
                        getRendition={(rendition) => setRendition(rendition)}
                        epubOptions={{
                            spread: pdf.state.viewMode === 'double' ? 'always' : 'none',
                            flow: pdf.state.viewMode === 'double' ? 'auto' : 'paginated'
                        }}
                        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
                    />
                </div>
            )}
        </div>
    );
};

export default EpubViewer;
