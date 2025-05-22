import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='w-full h-screen overflow-hidden relative'>
            <div className='flex flex-col items-center justify-center absolute top-1/2  left-1/2 transform -translate-x-[50%]  -translate-y-[50%] '>
                <h1 className='text-9xl font-bold text-gray-700 tracking-widest'>404</h1>
                <h1 className='text-5xl font-bold text-gray-700 tracking-widest'>Page Not Found</h1>

                <Link to={"/"}>
                    <button className='bg-gray-800 text-white px-4 h-10 rounded-md mt-16'>Back to Home</button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;