import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <div>
            <nav>
               <div className="header-container">
               <div className="logo">
                    Urban Riders
                </div>
                <ul>

                    <li>
                        <Link className="link" to="/home">Home</Link>
                    </li>
                    <li>
                        <Link className="link" to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link className="link" to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link className="link" to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link className="link login" to="/login">Login</Link>
                    </li>
                </ul>
               </div>
            </nav>
        </div>
    );
};

export default Header;