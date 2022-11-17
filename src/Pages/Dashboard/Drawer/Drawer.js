import React from 'react';
import { Link } from 'react-router-dom';

const Drawer = () => {
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* <!-- Page content here --> */}
                <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side border border-gray-600">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <Link to='/'><a>Sidebar Item 1</a></Link>
                    <Link to='/'><a>Sidebar Item 2</a></Link>
                </ul>

            </div>
        </div>
    );
};

export default Drawer;