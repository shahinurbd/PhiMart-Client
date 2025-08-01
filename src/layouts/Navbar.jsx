import React from 'react';
import { Link} from 'react-router';
import useAuthContext from '../hooks/useAuthContext';
import useCartContext from '../hooks/useCartContext';

const Navbar = () => {
    const { user, logoutUser } = useAuthContext();
    const {cart} = useCartContext();
    return (
        <div>
            
            <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><Link to="" >Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link>Services</Link></li>
                    <li><Link>About</Link></li>
                </ul>
                </div>
                <Link to='' className='font-sans font-bold text-2xl'>PhiMart</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><Link to="" >Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to=''>Services</Link></li>
                <li><Link to=''>About</Link></li>
                
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div>
                        <div className="flex-none">
                        <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                        <span className="badge badge-sm indicator-item">{cart?.items?.length || 0}</span>
                        </div>
                        </div>
                        <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                        <span className="text-lg font-bold">{cart?.items?.length || 0} Items</span>
                        <span className="text-info">Subtotal: {cart?.total_price || 0}</span>
                        <div className="card-actions">
                            <Link to="/dashboard/cart/">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </Link>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                        </div>
                        <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                        <Link to='dashboard/profile' className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </Link>
                        </li>
                        <li><Link to='dashboard' >Dashboard</Link></li>
                        <li onClick={logoutUser}><a>Logout</a></li>
                        </ul>
                        </div>
                        </div>
                    </div>

                ) : (
                    <div className='flex gap-3'>
                        <Link to="/login" className='btn btn-secondary md:py-4 md:px-4 text-sm py-1 px-1'>Sign In</Link>
                        <Link to="/register" className='btn btn-secondary md:py-4 md:px-4 text-sm py-1 px-1'>Sign Up</Link>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default Navbar;