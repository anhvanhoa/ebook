import React from 'react';
import Categories from './_components/Categories';
import Footer from './_components/Footer';
import Header from './_components/Header';

type LayoutClientProps = {
    children: React.ReactNode;
};

const LayoutClient = ({ children }: LayoutClientProps) => {
    return (
        <div className='text-gray-700'>
            <Header />
            <Categories />
            {children}
            <Footer />
        </div>
    );
};

export default LayoutClient;
