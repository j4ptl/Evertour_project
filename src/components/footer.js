import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // Assuming you have a separate CSS file for styling

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="row">
                    <a href="https://www.facebook.com/profile.php?id=61560550157818">
                        <FontAwesomeIcon icon={faFacebook} style={{
                            fontSize: "2em",
                            margin: '0% 1%'
                        }} />
                    </a>
                    <a href="https://www.instagram.com/evertours_clodify/">
                        <FontAwesomeIcon icon={faInstagram} style={{
                            fontSize: "2em",
                            margin: '0% 1%'
                        }}  />
                    </a>
                    <a href="../error page.html">
                        <FontAwesomeIcon icon={faYoutube} style={{
                            fontSize: "2em",
                            margin: '0% 1%'
                        }} />
                    </a>
                </div>

                <div className="row">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/About">About</a></li>
                        <li><a href="/Destination">Destination</a></li>
                        <li><a href="/Booking">Booking</a></li>
                    </ul>
                </div>
                <div className="row">
                    CLODIFY Copyright © 2024 Clodify - All rights reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;
