// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import ePub, { Book, Rendition } from 'epubjs';
// import { usePdf } from '@/provider/pdf/context';

// const EpubViewer = ({ fileUrl }: { fileUrl: string }) => {
//     const pdf = usePdf();
//     const viewerRef = useRef<HTMLDivElement>(null);
//     const [book, setBook] = useState<Book | null>(null);
//     const [rendition, setRendition] = useState<Rendition | null>(null);
//     const [content, setContent] = useState<string | null>(null);
//     useEffect(() => {
//         if (!fileUrl) return;
//         // Khởi tạo sách EPUB
//         const epubBook = ePub(fileUrl);
//         console.log(epubBook);
//         setBook(epubBook);
//         epubBook.opened.then((nav) => {
//             epubBook.ready.then(async () => {
//                 console.log(await epubBook.archive.getText('/OEBPS/Text/index_split_003.html'));
//                 setContent(await epubBook.archive.getText('/OEBPS/Text/index_split_003.html'));
//             });
//         });
//         epubBook.loaded.navigation.then((nav) => {
//             console.log('📚 Danh sách mục lục:', nav);
//         });

//         epubBook.loaded.cover.then((cover) => {
//             console.log('🖼 Ảnh bìa:', cover);
//         });
//         epubBook.ready.then(async (e) => {
//             console.log('📖 Sách đã sẵn sàng:', e);
//         });
//     }, [fileUrl]);

//     // Chuyển trang
//     const nextPage = () => rendition?.next();
//     const prevPage = () => rendition?.prev();
//     const classTypo =
//     'max-w-screen prose mx-auto prose-stone max-w-none flex-1 prose-h2:font-semibold px-6 pt-3 pb-1.5 prose-a:hover:text-pink-600 prose-a:transition-colors';
//     const increaseFontSize = () => {
//         rendition?.themes.fontSize('120%');
//     };
//     return (
//         <div className='relative w-full h-[calc(100vh-50px)]'>
//             <div
//                 className={classTypo}
//                 style={{
//                     width: pdf.state.width * pdf.state.scale
//                 }}
//             >
//                 {content && <div className='bg-white h-full' dangerouslySetInnerHTML={{ __html: content }}></div>}
//             </div>
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
    return (
        <div className='overflow-x-auto h-[calc(100vh-2.75rem)] custom-scrollbar mx-auto' style={{
            width: pdf.state.width
        }}>
            {pdf.state.fileUrl && (
                <EpubView
                    url={pdf.state.fileUrl}
                    location={location}
                    epubOptions={{
                        spread: 'none',
                        flow: 'paginated'
                    }}
                    locationChanged={(epubcfi: string) => setLocation(epubcfi)}
                />
            )}
        </div>
    );
};

export default EpubViewer;
