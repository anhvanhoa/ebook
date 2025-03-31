'use client';
import { usePdf } from '@/provider/pdf/context';
import React, { useMemo } from 'react';
import NumPage from './NumPage';
import { cn } from '@/lib/utils';
const classTypo =
    'max-w-screen prose prose-stone max-w-none border-x flex-1 prose-h2:font-semibold px-6 pt-3 pb-1.5 prose-a:hover:text-pink-600 prose-a:transition-colors';
const HtmlViewer = () => {
    const pdf = usePdf();
    const markdown = useMemo(() => {
        return {
            pageOne: pdf.state.pages[pdf.state.pageNumber - 1].content,
            pageTwo: pdf.state.pages[pdf.state.pageNumber]?.content
        };
    }, [pdf.state.pageNumber, pdf.state.pages]);
    const styleTypo = useMemo(() => {
        let width = pdf.state.width * 1.2
        // tablet not scale
        if (pdf.state.isMobile) {
            width = pdf.state.width
        }
        return {
            width: width,
            fontSize: `${16 * pdf.state.scale}px`,
            fontFamily: `var(${pdf.state.fontFamily})`
        };
    }, [pdf.state.fontFamily, pdf.state.isMobile, pdf.state.scale, pdf.state.width]);
    return (
        <div className='max-w-screen h-[calc(100vh-2.75rem)] overflow-auto custom-scrollbar'>
            <div className='flex w-fit mx-auto min-h-full'>
                <div className='flex flex-col'>
                    <div
                        style={styleTypo}
                        className={cn(classTypo, {
                            'prose-invert': pdf.state.color === '#FFFFFF',
                            'dark:prose-invert': !pdf.state.color && !pdf.state.background
                        })}
                        dangerouslySetInnerHTML={{ __html: markdown.pageOne }}
                    ></div>
                    <NumPage pageNumber={pdf.state.pageNumber} totalPages={pdf.state.totalPages} />
                </div>
                {pdf.state.viewMode === 'double' && pdf.state.pageNumber + 1 <= pdf.state.totalPages && (
                    <>
                        <div className='bg-gray-100 shrink-0' style={{ width: `2px` }}></div>
                        <div className='flex flex-col'>
                            <div
                                style={styleTypo}
                                className={classTypo}
                                dangerouslySetInnerHTML={{ __html: markdown.pageTwo }}
                            ></div>
                            <NumPage pageNumber={pdf.state.pageNumber + 1} totalPages={pdf.state.totalPages} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HtmlViewer;
