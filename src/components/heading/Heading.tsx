import React from 'react';

type HeadingProps = {
    title?: string;
};

const Heading = ({ title = 'Ebook Story' }: HeadingProps) => {
    return (
        <div className='py-20'>
            <h1 className='text-5xl font-bold text-center'>
                <span className='text-gray-700'>{title}</span>
            </h1>
        </div>
    );
};

export default Heading;
