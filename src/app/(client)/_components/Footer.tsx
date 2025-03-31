import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className='py-4 mt-20'>
            <p className='text-center text-sm'>
                Developer by <Link className='font-medium text-blue-600' href={'https://anhvanhoa.com'}>AnhVanHoa</Link>
            </p>
        </div>
    );
};

export default Footer;
