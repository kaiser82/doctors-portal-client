import React from 'react';

const Loading = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="w-20 h-20 border-4 border-dotted rounded-full animate-spin border-violet-600"></div>
        </div>
    );
};

export default Loading;