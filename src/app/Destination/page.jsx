"use client"
import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/header.js';
import Footer from '../../components/footer.js';
import axios from 'axios';
import './desti.css';
import Link from 'next/link';
import Loader from '../../components/loading.js';

const Evertours = () => {
    const [destinationDetails, setDestinationDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const cardsRef = useRef([]);
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        const fetchDestinationDetails = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/destination-details?populate=Images,Videos');
                const data = response.data;
                console.log(data); // Log the data to check its structure
                setDestinationDetails(data.data || []); // Ensure destinationDetails is an array
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDestinationDetails();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.1 // Trigger the animation when 10% of the element is in view
        });

        const cards = cardsRef.current;
        cards.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => {
            cards.forEach(card => {
                if (card) observer.unobserve(card);
            });
        };
    }, [destinationDetails]);

    useEffect(() => {
        const handleMenuClick = () => {
            const navMenu = document.getElementById('navMenu');
            if (navMenu.className === 'nav') {
                navMenu.className += ' responsive';
            } else {
                navMenu.className = 'nav';
            }
        };

        const hamburgerMenu = document.getElementById('hamburgerMenu');
        hamburgerMenu?.addEventListener('click', handleMenuClick);

        return () => {
            hamburgerMenu?.removeEventListener('click', handleMenuClick);
        };
    }, []);

    const openModal = (index, videoUrl) => {
        console.log("Opening modal for index:", index, "with video URL:", videoUrl);
        setActiveCard(index);
        setVideoUrl(videoUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log("Closing modal");
        setIsModalOpen(false);
        setVideoUrl('');
    };

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <>
          
                <div id="arrow">
                    <Header />

                    <div className="container fade-in slide-up">
                        <video autoPlay muted loop className="background-video">
                            <source src="/videos/kashmir.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="centered-text">
                            <h2 id="typing-text">Planning Trip to anywhere in the World!</h2><br />
                            <p>Discover with us!</p>
                        </div>
                    </div>

                    <h4 style={{ color: '#1e7898', fontWeight: 700 }}><center>Most Popular Destinations</center></h4>
                    <div className="grid-container">
                        {Array.isArray(destinationDetails) && destinationDetails.map((detail, index) => {
                            const imageUrl = detail.attributes.Images?.data?.attributes?.url ? `http://localhost:1337${detail.attributes.Images.data.attributes.url}` : '';
                            const videoUrl = detail.attributes.Videos?.data?.[0]?.attributes?.url ? `http://localhost:1337${detail.attributes.Videos.data[0].attributes.url}` : '';

                            return (
                                <div
                                    key={detail.id}
                                    className="card animate-on-scroll"
                                    ref={el => { cardsRef.current[index] = el; }}
                                    onClick={() => openModal(index, videoUrl)}
                                >
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt={detail.attributes.Title}
                                        />
                                    )}
                                    <button id="arrowButton" className="arrow-button"><i className="fas fa-play"></i></button>
                                    <h2>{detail.attributes.Title}</h2>
                                    <p>{detail.attributes.Description1}<br />
                                        {detail.attributes.Description2}</p>
                                    {/* Ensure that clicking "BOOK WITH US" does not trigger modal */}
                                    <Link href={`/Booking`}><button style={{ backgroundColor: '#134b5f', color: 'aliceblue', borderRadius: '10px', height: '30px', width: '150px', cursor: 'pointer' }}>BOOK WITH US</button></Link>
                                </div>
                            );
                        })}
                    </div>

                    {isModalOpen && activeCard !== null && (
                        <div id="myModal" className="modal" style={{ display: 'block' }}>
                            <div className="modal-content">
                                <span className="close" onClick={closeModal}>&times;</span>
                                <video id="video" controls autoPlay>
                                    <source src={videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    )}

                    <Footer />
                    <Link href="" className="top"><i className="fas fa-arrow-up"></i></Link>
                </div>
            
        </>
    );
};

export default Evertours;
