import React from 'react';
import './Navbar.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import LogoutLink from '../../Components/Authorization/LogoutLink';
import AuthorizeView, { AuthorizedUser } from '../../Components/Authorization/AuthorizationView';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 py-4">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/"><img className="h-8 w-auto" src={logo} alt="Your Company" /></Link>
                    </div>
                    <div className="hidden sm:flex sm:space-x-4">
                        <Link to="/" className="rounded-md bg-teal-500 hover:bg-teal-400 px-3 py-2 text-sm font-medium text-grey-900" aria-current="page">Home</Link>
                    
                        <span className="rounded-md bg-teal-500 hover:bg-teal-400 px-3 py-2 text-sm font-medium text-grey-900"><LogoutLink >Logout <AuthorizedUser value="email" /></LogoutLink></span>
                    </div>

                    <button
                        type="button"
                        className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link to="/" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Home</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
