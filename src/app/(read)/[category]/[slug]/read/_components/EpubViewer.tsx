// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import ePub, { Book, Rendition } from 'epubjs';
// import { usePdf } from '@/provider/pdf/context';

// const EpubViewer = ({ fileUrl }: { fileUrl: string }) => {
//     const pdf = usePdf();
//     const viewerRef = useRef<HTMLDivElement>(null);
//     const [book, setBook] = useState<Book | null>(null);
//     const [rendition, setRendition] = useState<Rendition | null>(null);

//     useEffect(() => {
//         if (!fileUrl || !viewerRef.current) return;

//         // Khởi tạo sách EPUB
//         const epubBook = ePub(fileUrl);
//         setBook(epubBook);

//         // Render nội dung vào div thay vì iframe
//         const epubRendition = epubBook.renderTo(viewerRef.current, {
//             width: '100%',
//             height: '100%',
//             flow: 'paginated',
//             spread: 'none'
//         });

//         epubRendition.display(); // Hiển thị trang đầu tiên
//         setRendition(epubRendition);

//         return () => epubRendition.destroy();
//     }, [fileUrl]);

//     // Chuyển trang
//     const nextPage = () => rendition?.next();
//     const prevPage = () => rendition?.prev();

//     const increaseFontSize = () => {
//         rendition?.themes.fontSize('120%');
//     };
//     return (
//         <div className='relative w-full h-[calc(100vh-50px)]'>
//             <div
//                 ref={viewerRef}
//                 className='bg-white h-full'
//                 style={{
//                     width: pdf.state.width * pdf.state.scale
//                 }}
//             />
//             <button onClick={increaseFontSize} className='absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-200'>
//                 ⬅
//             </button>
//             <button onClick={nextPage} className='absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gray-200'>
//                 ➡
//             </button>
//         </div>
//     );
// };

// export default EpubViewer;

'use client';
import { usePdf } from '@/provider/pdf/context';
import React, { useRef, useState } from 'react';
import type { Rendition } from 'epubjs';
import { ReactReader } from 'react-reader';
const EpubViewer = () => {
    const pdf = usePdf();
    const rendition = useRef<Rendition | undefined>(undefined);
    const [location, setLocation] = useState<string | number>(0);
    return (
        <div className='mx-auto custom-scrollbar h-[calc(100vh-2.75rem)] overflow-auto' style={{
            backgroundColor: pdf.state.background,
            color: `${pdf.state.color}`,
            width: pdf.state.width * pdf.state.scale
        }}>
            <ReactReader
                epubOptions={{
                    flow: 'paginated',
                    spread: 'none'
                }}
                url={pdf.state.fileUrl ?? ''}
                location={location}
                locationChanged={(loc: string) => setLocation(loc)}
                getRendition={(_rendition: Rendition) => {
                    rendition.current = _rendition;
                }}
            />
        </div>
    );
};

export default EpubViewer;
