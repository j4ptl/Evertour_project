import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import './header.css'; // Ensure you have the CSS file in place

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        setUsername(null);
        // redirect to home or login page
    };

    useEffect(() => {
        // Retrieve username from localStorage or session
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <header>
            <img src="evertours.svg" alt="Evertours Logo" />
            <h1>EverTours</h1>
            <nav className={`nav ${menuOpen ? 'responsive' : ''}`} id="navMenu">
                <ul>
                    <li><a href="/#">Home</a></li>
                    <li><a href="/About">About</a></li>
                    <li><a href="/Destination">Destination</a></li>
                    <li><a href="/Booking">Booking</a></li>
                    <li>
                        {username ? (
                            <div className="dropdown">
                                <button className="reg" onClick={toggleDropdown}>
                                    <FontAwesomeIcon icon={faUserCircle} size="2x" />
                                </button>
                                {showDropdown && (
                                    <div className="dropdown-content">
                                        <div className="dropdown-header">
                                            <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '20px', marginRight: '10px' }} />
                                            <span>{username}</span>
                                        </div>
                                        <a onClick={handleLogout} className="dropdown-item" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', cursor: 'pointer' }}>
                                            <FontAwesomeIcon icon={faSignOut} style={{ fontSize: '20px', marginRight: '10px' }} />
                                            Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a href="/login">
                                <button className="reg">
                                    <FontAwesomeIcon icon={faUserCircle} size="2x" />
                                </button>
                            </a>
                        )}
                    </li>
                </ul>
            </nav>
            <button className="svg" id="hamburgerMenu" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" height="36px" width="36px" viewBox="0 0 50 50">
                    <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z"></path>
                </svg>
            </button>
        </header>
    );
};

export default Header;
