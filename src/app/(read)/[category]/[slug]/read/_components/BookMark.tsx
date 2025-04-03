import { Button } from '@/components/ui/button';
import { BookMark as BookMarkType } from '@/provider/pdf/context';
import React from 'react';

type BookMarkProps = {
    data: BookMarkType[];
};

const BookMark = ({ data }: BookMarkProps) => {
    return (
        <>
            {data.length > 0 && (
                <div>
                    {data.map((item, index) => (
                        <Button
                            key={index}
                            onClick={item.onClick}
                            className='!text-blue-600 font-normal cursor-pointer h-auto py-1 px-1 block'
                            variant={'link'}
                        >
                            {item.label}
                        </Button>
                    ))}
                </div>
            )}
        </>
    );
};

export default BookMark;
