import Header from '@/components/layout/header';
import React from 'react';
type LayoutAuthProps = {
    children: React.ReactNode;
};
const LayoutAuth = ({ children }: LayoutAuthProps) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default LayoutAuth;
