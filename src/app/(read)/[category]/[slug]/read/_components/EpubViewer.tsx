'use client';
import { usePdf } from '@/provider/pdf/context';
import React, { useEffect, useState } from 'react';
import { EpubView } from 'react-reader';
import { Rendition } from 'epubjs';
import Loading from './Loading';
import { cn } from '@/lib/utils';

const EpubViewer = () => {
    const pdf = usePdf();
    const [rendition, setRendition] = useState<Rendition | null>(null);
    const [location, setLocation] = useState<string | number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        let TimeID: NodeJS.Timeout;
        if (rendition) {
            setLoading(true);
            if (typeof location === 'string') {
                rendition.display(location);
                TimeID = setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
        return () => {
            clearTimeout(TimeID);
        };
    }, [location, pdf.state.scale, rendition]);
    return (
        <div className='overflow-x-auto h-[calc(100vh-2.75rem)] custom-scrollbar relative'>
            {loading && (
                <div className='absolute w-full h-full bottom-0 z-50 bg-primary-foreground'>
                    <Loading />
                </div>
            )}
            {pdf.state.fileUrl && (
                <div
                    style={{ width: pdf.state.width * pdf.state.scale }}
                    className={cn('h-full mx-auto', {
                        'blur-lg': loading
                    })}
                >
                    <EpubView
                        url={pdf.state.fileUrl}
                        location={location}
                        getRendition={(rendition) => {
                            setRendition(rendition);
                        }}
                        epubOptions={{
                            spread: 'none',
                            flow: 'paginated'
                        }}
                        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
                    />
                </div>
            )}
        </div>
    );
};

export default EpubViewer;
