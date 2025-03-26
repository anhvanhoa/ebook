import React from 'react';

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
    };
    setState: (state: EbookContextPageState) => void;
};

export type EbookContextPageState = EbookContextPage['state'];

export const stateDefault: EbookContextPageState = {
    width: 625,
    height: 884.125,
    pageNumber: 1,
    totalPages: 0,
    scale: 1,
    scroll: 'vertical',
    viewMode: 'single'
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
