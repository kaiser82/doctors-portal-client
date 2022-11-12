import React from 'react';

const Review = ({ review }) => {
    const { name, pic, location, message } = review
    console.log(review)
    return (
        <div className="card shadow-xl">
            <div className="card-body">

                <p>{message}</p>
                <div className="card-actions justify-start items-center space-x-5">
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={pic} alt="" />
                        </div>
                    </div>
                    <div>
                        <p className='font-semibold'>{name}</p>
                        <p className='text-sm'>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;