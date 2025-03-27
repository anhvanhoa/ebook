'use client';
import { usePdf } from '@/provider/pdf/context';
import React, { useMemo } from 'react';
import Markdown from 'react-markdown';
const MdViewer = () => {
    const pdf = usePdf();
    const markdown = useMemo(() => {
        return {
            pageOne: pdf.state.pages[pdf.state.pageNumber - 1].content,
            pageTwo: pdf.state.pages[pdf.state.pageNumber]?.content
        };
    }, [pdf.state.pageNumber]);
    return (
        <div className='max-w-screen h-[calc(100vh-2.75rem)] overflow-auto'>
            <div className='flex justify-center h-full'>
                <div
                    style={{ width: pdf.state.width * pdf.state.scale, fontSize: `${16 * pdf.state.scale}px` }}
                    className='prose prose-stone flex-1'
                >
                    <Markdown remarkPlugins={[]}>{markdown.pageOne}</Markdown>
                </div>
                {pdf.state.viewMode === 'double' && pdf.state.pageNumber + 1 <= pdf.state.totalPages && (
                    <>
                        <div className='bg-gray-100 shrink-0' style={{ width: `${2 * pdf.state.scale}px` }}></div>
                        <div
                            className='prose prose-stone flex-1'
                            style={{ width: pdf.state.width * pdf.state.scale, fontSize: `${16 * pdf.state.scale}px` }}
                        >
                            <Markdown remarkPlugins={[]}>{markdown.pageTwo}</Markdown>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MdViewer;
