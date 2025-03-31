import { LoginForm } from '@/components/login-form';
import React from 'react';

const page = () => {
    return (
        <div className='sm:max-w-screen-xs md:max-w-screen-md mx-auto mt-24 px-6'>
            <LoginForm />
        </div>
    );
};

export default page;
