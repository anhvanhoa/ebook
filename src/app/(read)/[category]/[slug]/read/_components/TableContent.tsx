import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { TableContent as TableContentType } from '@/provider/pdf/context';
import React from 'react';

type ItemProps = {
    label: string;
    href: string;
    prefix: string;
    onClick?: () => void;
};

const Item = ({ label, prefix, onClick }: ItemProps) => {
    return (
        <SheetClose asChild>
            <Button
                onClick={onClick}
                className='!text-blue-600 font-normal cursor-pointer h-auto py-1 px-1 block'
                variant={'link'}
            >
                <span>{prefix}. </span>
                <span>{label}</span>
            </Button>
        </SheetClose>
    );
};

type TableContentProps = {
    data: TableContentType[];
    prefix?: string;
};

const TableContent = ({ data, prefix = '' }: TableContentProps) => {
    return (
        <>
            {data.map((item, index) => {
                const newPrefix = prefix ? `${prefix}.${index + 1}` : `${index + 1}`; // 1, 2, 3 -> 1.1, 1.2 -> 1.1.1, 1.1.2

                if (!item.children) {
                    return (
                        <Item
                            onClick={item.onClick}
                            href={item.href}
                            label={item.label}
                            prefix={newPrefix}
                            key={index}
                        />
                    );
                }

                return (
                    <div key={index}>
                        <Item onClick={item.onClick} href={item.href} label={item.label} prefix={newPrefix} />
                        <div className='ml-4 py-1'>
                            <TableContent key={index} data={item.children} prefix={newPrefix} />
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default TableContent;
