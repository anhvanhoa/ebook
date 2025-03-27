import EbookProvider, { EbookContextPageState } from '@/provider/pdf/context';
import Read from './Read';
import { Noto_Serif, Lora, Merriweather, Roboto_Slab, EB_Garamond } from 'next/font/google';
import { cn } from '@/lib/utils';

const noto = Noto_Serif({
    variable: '--font-noto-serif',
    subsets: ['latin']
});
const lora = Lora({
    variable: '--font-lora',
    subsets: ['latin']
});

const merriweather = Merriweather({
    variable: '--font-merriweather',
    subsets: ['latin'],
    weight: ['300', '400', '700', '900']
});

const robotoSlab = Roboto_Slab({
    variable: '--font-roboto-slab',
    subsets: ['latin']
});

const ebGaramond = EB_Garamond({
    variable: '--font-eb-garamond',
    subsets: ['latin']
});

const stateDefault: Partial<EbookContextPageState> = {
    // fileUrl: '/e.pdf',
    typeFile: 'html',
    totalPages: 6,
    pages: [
        {
            content:
                '<h2 style="text-align:center;">NASA</h2><p>Just a link: <a href="https://www.nasa.gov">www.nasa.gov</a> 1.</p>',
            pageNumber: 1
        },
        {
            content: '<h2>NASA</h2><p>Just a link: www.nasa.gov 2.</p>',
            pageNumber: 2
        },
        {
            content: '## NASA\nJust a link: www.nasa.gov 3.',
            pageNumber: 3
        },
        {
            content: '## NASA\nJust a link: www.nasa.gov 4.',
            pageNumber: 4
        },
        {
            content: '## NASA\nJust a link: www.nasa.gov 5.',
            pageNumber: 5
        },
        {
            content: '## NASA\nJust a link: www.nasa.gov 6.',
            pageNumber: 6
        }
    ]
    // images: [
    //     {
    //         alt: 'image 1',
    //         id: '1',
    //         pageNumber: 1,
    //         url: '/page-1.jpg'
    //     },
    //     {
    //         alt: 'image 2',
    //         id: '2',
    //         pageNumber: 2,
    //         url: '/page-1.png'
    //     }
    // ]
};
const EbookPage = () => {
    return (
        <div
            className={cn(
                noto.variable,
                lora.variable,
                merriweather.variable,
                robotoSlab.variable,
                ebGaramond.variable,
            )}
        >
            <EbookProvider init={stateDefault}>
                <Read />
            </EbookProvider>
        </div>
    );
};

export default EbookPage;
