import React from 'react';
import Categories from './_components/Categories';

type LayoutClientProps = {
    children: React.ReactNode;
};

const LayoutClient = ({ children }: LayoutClientProps) => {
    return (
        <div className='text-gray-700 selection:bg-[#FAF3E0]'>
            <Categories />
            {children}
        </div>
    );
};

export default LayoutClient;
