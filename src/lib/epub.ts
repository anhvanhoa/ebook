import { TableContent } from "@/provider/pdf/context";

export const convertNavToTableContent = (navItems: any[]): TableContent[] => {
    return navItems.map(item => ({
        label: item.label.trim(),
        href: item.href,
        children: item.subitems.length > 0 ? convertNavToTableContent(item.subitems) : undefined
    }));
};