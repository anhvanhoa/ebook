'use client';
import { usePdf } from '@/provider/pdf/context';
import React, { useLayoutEffect, useState } from 'react';
import { EpubView } from 'react-reader';
import { Rendition } from 'epubjs';
import Loading from './Loading';
import { useDebounce } from 'use-debounce';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import NumPage from './NumPage';

const EpubViewer = () => {
    const pdf = usePdf();
    const [rendition, setRendition] = useState<Rendition | null>(null);
    const [location, setLocation] = useState<string | number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [scale] = useDebounce(pdf.state.scale, 300);
    const { resolvedTheme } = useTheme();
    useLayoutEffect(() => {
        let TimeID: NodeJS.Timeout;
        if (rendition) {
            setLoading(true);
            if (pdf.state.color && pdf.state.background) {
                rendition.themes.override('color', pdf.state.color);
                rendition.themes.override('background-color', pdf.state.background);
            } else {
                if (resolvedTheme === 'dark') {
                    rendition.themes.override('color', 'rgb(249,250,251)');
                    rendition.themes.override('background-color', 'rgb(3,7,18)');
                } else if (resolvedTheme === 'light') {
                    rendition.themes.override('color', 'rgb(54,65,83)');
                    rendition.themes.override('background-color', 'rgb(255,255,255)');
                }
            }
            if (rendition?.location?.start) {
                pdf.setState((state) => ({
                    ...state,
                    pageNumber: rendition.location.start.displayed.page,
                    totalPages: rendition.location.start.displayed.total
                }));
            }
            if (pdf.state.fontFamily) rendition.themes.override('font-family', `var(${pdf.state.fontFamily})`);
            rendition.themes.fontSize(`${16 * scale}px`);
            rendition.themes.override('line-height', `${1.6 * scale}rem`);
            rendition.spread(pdf.state.viewMode === 'double' ? 'always' : 'none');
            rendition.flow(pdf.state.viewMode === 'double' ? 'paginated' : 'paginated');
            rendition.display(String(location));
            TimeID = setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        return () => {
            clearTimeout(TimeID);
        };
    }, [
        scale,
        rendition,
        pdf.state.viewMode,
        pdf.state.fontFamily,
        pdf.state.background,
        pdf.state.color,
        resolvedTheme
    ]);
    return (
        <div className='overflow-x-auto h-[calc(100vh-2.75rem)] custom-scrollbar relative'>
            {loading && (
                <div
                    style={{ backgroundColor: pdf.state.background }}
                    className='absolute w-full h-full bottom-0 z-50 bg-primary-foreground'
                >
                    <Loading style={{ backgroundColor: pdf.state.background }} />
                </div>
            )}
            {pdf.state.fileUrl && (
                <div
                    className={cn('h-full mx-auto', {
                        'max-w-screen-lg': pdf.state.viewMode === 'single',
                        'max-w-screen-xl': pdf.state.viewMode === 'double'
                    })}
                >
                    <EpubView
                        epubOptions={{ stylesheet: '/css/epub.css' }}
                        url={pdf.state.fileUrl}
                        location={location}
                        getRendition={(rendition) => setRendition(rendition)}
                        locationChanged={async (epubcfi: string) => {
                            console.log(rendition?.book.packaging.spine);
                            setLocation(epubcfi);
                        }}
                    />
                    <NumPage pageNumber={pdf.state.pageNumber} totalPages={pdf.state.totalPages} />
                </div>
            )}
        </div>
    );
};

export default EpubViewer;
