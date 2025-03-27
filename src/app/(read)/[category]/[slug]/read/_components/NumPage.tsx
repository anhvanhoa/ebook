import React from 'react';
type NumPageProps = {
    totalPages: number;
    pageNumber: number;
};

const NumPage = ({ pageNumber, totalPages }: NumPageProps) => {
    return (
        <div className='flex justify-center sticky bottom-2 z-10'>
            <p className='rounded-3xl text-xs px-2.5 py-1 bg-gray-50/10 backdrop-blur-md'>
                {pageNumber} / {totalPages}
            </p>
        </div>
    );
};

export default NumPage;
