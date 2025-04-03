'use client';
import { Rendition } from 'epubjs';
import React from 'react';

type Page = {
    content: string;
    pageNumber: number;
};

type Img = {
    url: string;
    pageNumber: number;
    alt: string;
    id: string;
};

export type TableContent = {
    label: string;
    href: string;
    children?: TableContent[];
    onClick?: (...arg: any[]) => void;
};

export type BookMark = {
    label: string;
    href: string;
    onClick?: (...arg: any[]) => void;
};

type EbookContextPage = {
    state: {
        rendition: Rendition | null;
        width: number;
        height: number;
        pageNumber: number;
        scale: number;
        fileUrl?: string;
        totalPages: number;
        background: string;
        color: string;
        viewMode: 'single' | 'double';
        typeFile: 'pdf' | 'epub' | 'html' | 'image' | 'epub';
        pages: Page[];
        images: Img[];
        fontFamily?: string;
        isMobile: boolean;
        tableContents: TableContent[];
        bookMarks: BookMark[];
    };
    setState: React.Dispatch<React.SetStateAction<EbookContextPage['state']>>;
};

export type EbookContextPageState = EbookContextPage['state'];

export const stateDefault: EbookContextPageState = {
    width: 750,
    height: 884.125,
    pageNumber: 1,
    totalPages: 0,
    scale: 1,
    background: '',
    color: '',
    viewMode: 'single',
    typeFile: 'pdf',
    pages: [],
    images: [],
    isMobile: false,
    rendition: null,
    tableContents: [],
    bookMarks: [],
};

export const EbookContext = React.createContext<EbookContextPage>({
    state: stateDefault,
    setState: () => {}
});

const EbookProvider: React.FC<{ children: React.ReactNode; init?: Partial<EbookContextPageState> }> = ({
    children,
    init = stateDefault
}) => {
    const [state, setState] = React.useState<EbookContextPageState>({
        ...stateDefault,
        ...init
    });
    return <EbookContext.Provider value={{ state, setState }}>{children}</EbookContext.Provider>;
};
export default EbookProvider;

export const usePdf = () => React.useContext(EbookContext);
