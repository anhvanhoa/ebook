import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className='py-4 bg-gray-50 mt-20'>
            <p className='text-center'>
                Developer by <Link className='text-blue-600' href={'https://anhvanhoa.com'}>AnhVanHoa</Link>
            </p>
        </div>
    );
};

export default Footer;
