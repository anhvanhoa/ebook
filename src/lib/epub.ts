import { TableContent } from '@/provider/pdf/context';

export const convertNavToTableContent = (navItems: any[], onClick: (href: string) => void): TableContent[] => {
    return navItems.map((item) => ({
        label: item.label.trim(),
        href: item.href,
        onClick: () => onClick(item.href),
        children: item.subitems.length > 0 ? convertNavToTableContent(item.subitems, onClick) : undefined
    }));
};

export class Ref {
    num: number;
    gen: number;

    constructor({ num, gen }: { num: number; gen: number }) {
        this.num = num;
        this.gen = gen;
    }

    toString(): string {
        let str = `${this.num}R`;
        if (this.gen !== 0) {
            str += this.gen;
        }
        return str;
    }
}

export async function convertToTableContent(
    items: any[],
    getPageIndex: (ref: Ref) => Promise<number>,
    onClick: (pageNumber: number) => void
): Promise<TableContent[]> {
    return Promise.all(
        items.map(async (item) => {
            const [ref] = item.dest;
            const pageIndex = await getPageIndex(new Ref({ num: ref.num, gen: ref.gen }));
            return {
                label: item.title,
                href: (pageIndex + 1).toString(),
                onClick: () => onClick(pageIndex + 1),
                children:
                    item.items && item.items.length > 0
                        ? await convertToTableContent(item.items, getPageIndex, onClick)
                        : undefined
            };
        })
    );
}
