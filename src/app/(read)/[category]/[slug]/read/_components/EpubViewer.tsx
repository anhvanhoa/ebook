// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import ePub, { Book, Rendition } from 'epubjs';
// import { usePdf } from '@/provider/pdf/context';

// const EpubViewer = ({ fileUrl }: { fileUrl: string }) => {
//     const pdf = usePdf();
//     const [location, setLocation] = useState<string | number>(0);
//     const viewerRef = useRef<HTMLDivElement>(null);
//     const [book, setBook] = useState<Book | null>(null);
//     const [rendition, setRendition] = useState<Rendition | null>(null);
//     const [content, setContent] = useState<string | null>(null);
//     useEffect(() => {
//         if (!fileUrl) return;
//         // Khởi tạo sách EPUB
//         const epubBook = ePub(fileUrl);
//         setBook(epubBook);
//         epubBook.opened.then((nav) => {
//             console.log('📚 Mục lục:', nav);

//             epubBook.ready.then(async () => {
//                 setContent(await epubBook.archive.getText(`/OEBPS/${location}.html`));
//             });
//         });
//         epubBook.loaded.navigation.then((nav) => {
//             console.log('📚 Danh sách mục lục:', nav);
//         });

//         epubBook.loaded.cover.then((cover) => {
//             console.log('🖼 Ảnh bìa:', cover);
//         });
//     }, [fileUrl, location]);

//     // Chuyển trang
//     const nextPage = () => {
//         setLocation(1);
//         rendition?.next();
//     };
//     const prevPage = () => {
//         rendition?.prev();
//         setLocation(2);
//     };
//     const classTypo =
//         'max-w-screen prose mx-auto prose-stone max-w-none flex-1 prose-h2:font-semibold px-6 pt-3 pb-1.5 prose-a:hover:text-pink-600 prose-a:transition-colors';
//     const increaseFontSize = () => {
//         rendition?.themes.fontSize('120%');
//     };
//     return (
//         <div
//             style={{
//                 width: pdf.state.width * pdf.state.scale
//             }}
//             className='w-full h-[calc(100vh-50px)] overflow-auto custom-scrollbar'
//         >
//             {content && <iframe srcDoc={content} style={{ width: '100%', height: '100%' }} />}
//             <button onClick={prevPage} className='absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-200'>
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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { EpubView } from 'react-reader';

const EpubViewer = () => {
    const pdf = usePdf();
    const [location, setLocation] = useState<string | number>(0);
    useEffect(() => {
        setLocation(0);
    }, [pdf.state.viewMode]);
    return (
        <div
            className='overflow-x-auto h-[calc(100vh-2.75rem)] custom-scrollbar mx-auto'
            style={{
                width: pdf.state.width * 1.2 * (pdf.state.viewMode === 'double' ? 2 : 1)
            }}
        >
            {pdf.state.fileUrl && (
                <EpubView
                    url={pdf.state.fileUrl}
                    location={location}
                    epubOptions={
                        {
                            // spread: 'none',
                            // flow: 'paginated'
                        }
                    }
                    locationChanged={(epubcfi: string) => setLocation(epubcfi)}
                />
            )}
        </div>
    );
};

export default EpubViewer;
