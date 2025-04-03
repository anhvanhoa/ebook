'use client';
import { usePdf } from '@/provider/pdf/context';
import React, { useEffect, useState } from 'react';
import { EpubView } from 'react-reader';
import Loading from './Loading';
import { useDebounce } from 'use-debounce';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import NumPage from './NumPage';
import { convertNavToTableContent } from '@/lib/epub';

const EpubViewer = () => {
    const pdf = usePdf();
    const [location, setLocation] = useState<string | number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [scale] = useDebounce(pdf.state.scale, 300);
    const { resolvedTheme } = useTheme();
    const locationChanged = (epubcfi: string) => {
        if (pdf.state.rendition) {
            pdf.setState({
                ...pdf.state,
                pageNumber: pdf.state.rendition?.location.start.index + 1,
                totalPages: pdf.state.rendition?.book.packaging.spine.length
            });
        }
        setLocation(epubcfi);
    };
    useEffect(() => {
        let TimeID: NodeJS.Timeout;
        if (pdf.state.rendition) {
            setLoading(true);
            if (pdf.state.color && pdf.state.background) {
                pdf.state.rendition.themes.override('color', pdf.state.color);
                pdf.state.rendition.themes.override('background-color', pdf.state.background);
            } else {
                if (resolvedTheme === 'dark') {
                    pdf.state.rendition.themes.override('color', 'rgb(249,250,251)');
                    pdf.state.rendition.themes.override('background-color', 'rgb(3,7,18)');
                } else if (resolvedTheme === 'light') {
                    pdf.state.rendition.themes.override('color', 'rgb(54,65,83)');
                    pdf.state.rendition.themes.override('background-color', 'rgb(255,255,255)');
                }
            }
            if (pdf.state.fontFamily)
                pdf.state.rendition.themes.override('font-family', `var(${pdf.state.fontFamily})`);
            pdf.state.rendition.themes.fontSize(`${16 * scale}px`);
            pdf.state.rendition.themes.override('line-height', `${1.6 * scale}rem`);
            pdf.state.rendition.spread(pdf.state.viewMode === 'double' ? 'always' : 'none');
            pdf.state.rendition.flow(pdf.state.viewMode === 'double' ? 'paginated' : 'paginated');
            pdf.state.rendition.display(String(location));
            TimeID = setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        return () => {
            clearTimeout(TimeID);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        scale,
        pdf.state.rendition,
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
                        epubOptions={{
                            stylesheet: '/epub/base.min.css',
                            allowScriptedContent: true,
                            script: '/epub/index.min.js'
                        }}
                        url={pdf.state.fileUrl}
                        tocChanged={(value) =>
                            pdf.setState((s) => ({ ...s, tableContents: convertNavToTableContent(value, setLocation) }))
                        }
                        location={location}
                        getRendition={(rendition) => pdf.setState((s) => ({ ...s, rendition }))}
                        locationChanged={locationChanged}
                    />
                    {!!pdf.state.totalPages && (
                        <NumPage
                            className='fixed w-full left-0 '
                            pageNumber={pdf.state.pageNumber}
                            totalPages={pdf.state.totalPages}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default EpubViewer;
