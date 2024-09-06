import React from 'react';
import "./Navbar.css";
import logo from './logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        
        <nav className="navbar">
            <div className="logo">
                <img src={ logo } alt="Logo" />
            </div>
            <div className="nav-link">
                <a href="/search">Search</a>
            </div>
        </nav>

    )
};

export default Navbar;
