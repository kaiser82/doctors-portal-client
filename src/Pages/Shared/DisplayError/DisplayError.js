import React, { useContext } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext)
    const error = useRouteError();
    const handleLogOut = () => {
        logOut();
    }
    return (
        <div className='flex flex-col justify-center items-center h-screen space-y-5'>
            <p className='text-lg font-semibold text-red-500'>Something went wrong</p>
            <p className='text-lg font-semibold text-red-500'>{error.statusText || error.message}</p>
            <h4 className="text-2xl">Please <Link to='/'><button className='btn btn-lg btn-warning' onClick={handleLogOut}>Sign Out</button></Link>  and Login again</h4>
        </div>
    );
};

export default DisplayError;