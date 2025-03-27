import React from 'react';

type Page = {
    content: string;
    pageNumber: number;
}

type EbookContextPage = {
    state: {
        width: number;
        height: number;
        pageNumber: number;
        scale: number;
        fileUrl?: string;
        totalPages: number;
        scroll: 'vertical' | 'horizontal';
        viewMode: 'single' | 'double';
        typeFile: 'pdf' | 'epub' | 'md';
        pages: Page[];
    };
    setState: React.Dispatch<React.SetStateAction<EbookContextPage['state']>>;
};

export type EbookContextPageState = EbookContextPage['state'];

export const stateDefault: EbookContextPageState = {
    width: 625,
    height: 884.125,
    pageNumber: 1,
    totalPages: 0,
    scale: 1,
    scroll: 'vertical',
    viewMode: 'single',
    typeFile: 'pdf',
    pages: []
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
