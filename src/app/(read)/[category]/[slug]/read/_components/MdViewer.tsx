import { usePdf } from '@/provider/pdf/context';
import React from 'react';
import Markdown from 'react-markdown';
const markdown = `
## NASA
Just a link: www.nasa.gov.`;
const MdViewer = () => {
    const pdf = usePdf();
    return (
        <div className='max-w-screen h-[calc(100vh-2.75rem)] overflow-auto'>
            <div className='flex justify-center h-full'>
                <div style={{ width: pdf.state.width * pdf.state.scale, fontSize: `${16 * pdf.state.scale}px` }}>
                    <Markdown remarkPlugins={[]}>{markdown}</Markdown>
                </div>
                <div
                    className='bg-gray-100 shrink-0'
                    style={{
                        width: `${2 * pdf.state.scale}px`
                    }}
                ></div>
                <div style={{ width: pdf.state.width * pdf.state.scale, fontSize: `${16 * pdf.state.scale}px` }}>
                    <Markdown remarkPlugins={[]}>{markdown}</Markdown>
                </div>
            </div>
        </div>
    );
};

export default MdViewer;
