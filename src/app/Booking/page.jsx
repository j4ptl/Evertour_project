"use client"
import { useState, useEffect } from 'react';
import Header from '../../components/header.js';
import Footer from '../../components/footer.js';
import Loader from '../../components/loading.js';
import './style.css';

const Home = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings?populate=*`);
                if (!response.ok) {
                    throw new Error('Failed to fetch destinations');
                }
                const data = await response.json();
                console.log('Fetched destinations:', data);
                setDestinations(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching destinations:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {


        // Destination slider script
        const initSlider = () => {
            const carousel = document.querySelector('.carousel');
            if (!carousel) return;

            const leftArrow = document.getElementById('left');
            const rightArrow = document.getElementById('right');
            let isDragging = false,
                startPos = 0,
                currentTranslate = 0,
                prevTranslate = 0,
                animationID = 0,
                currentIndex = 0;

            const slideWidth = carousel.querySelector('.box')?.clientWidth + 20 || 0;
            const totalSlides = carousel.children.length;
            const maxIndex = totalSlides - 1;

            const resizeHandler = () => {
                const slideWidth = carousel.querySelector('.box')?.clientWidth + 20 || 0;
                setPositionByIndex();
            };

            const leftArrowHandler = () => {
                currentIndex = (currentIndex === 0) ? maxIndex : currentIndex - 1;
                setPositionByIndex();
            };

            const rightArrowHandler = () => {
                currentIndex = (currentIndex === maxIndex) ? 0 : currentIndex + 1;
                setPositionByIndex();
            };

            const dragStart = (event) => {
                isDragging = true;
                startPos = getPositionX(event);
                carousel.classList.add('grabbing');
                animationID = requestAnimationFrame(animation);
            };

            const dragEnd = () => {
                isDragging = false;
                cancelAnimationFrame(animationID);
                carousel.classList.remove('grabbing');
                const movedBy = currentTranslate - prevTranslate;
                if (movedBy > 50 && currentIndex > 0) {
                    currentIndex -= 1;
                } else if (movedBy < -50 && currentIndex < maxIndex) {
                    currentIndex += 1;
                }
                setPositionByIndex();
            };

            const drag = (event) => {
                if (isDragging) {
                    const currentPosition = getPositionX(event);
                    currentTranslate = prevTranslate + currentPosition - startPos;
                    setSliderPosition();
                }
            };

            const touchStart = (event) => {
                dragStart(event.touches[0]);
                event.preventDefault();
            };

            const touchEnd = () => {
                dragEnd();
            };

            const touchMove = (event) => {
                drag(event.touches[0]);
                event.preventDefault();
            };

            const getPositionX = (event) => {
                return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
            };

            const animation = () => {
                setSliderPosition();
                if (isDragging) requestAnimationFrame(animation);
            };

            const setSliderPosition = () => {
                carousel.style.transform = `translateX(${currentTranslate}px)`;
            };

            const setPositionByIndex = () => {
                currentTranslate = currentIndex * -slideWidth;
                prevTranslate = currentTranslate;
                setSliderPosition();
            };

            window.addEventListener('resize', resizeHandler);
            leftArrow.addEventListener('click', leftArrowHandler);
            rightArrow.addEventListener('click', rightArrowHandler);
            carousel.addEventListener('mousedown', dragStart);
            carousel.addEventListener('mouseup', dragEnd);
            carousel.addEventListener('mouseleave', dragEnd);
            carousel.addEventListener('mousemove', drag);
            carousel.addEventListener('touchstart', touchStart);
            carousel.addEventListener('touchend', touchEnd);
            carousel.addEventListener('touchmove', touchMove);

            return () => {
                window.removeEventListener('resize', resizeHandler);
                leftArrow.removeEventListener('click', leftArrowHandler);
                rightArrow.removeEventListener('click', rightArrowHandler);
                carousel.removeEventListener('mousedown', dragStart);
                carousel.removeEventListener('mouseup', dragEnd);
                carousel.removeEventListener('mouseleave', dragEnd);
                carousel.removeEventListener('mousemove', drag);
                carousel.removeEventListener('touchstart', touchStart);
                carousel.removeEventListener('touchend', touchEnd);
                carousel.removeEventListener('touchmove', touchMove);
            };
        };

        const roomCardsScript = () => {
            const roomCards = document.querySelectorAll('.room-card');
            roomCards.forEach(card => {
                card.addEventListener('click', function () {
                    this.classList.toggle('active');
                });
            });
        };

        initSlider();
        roomCardsScript();
        
    }, [destinations]);

    return (
        <><div id="arrow">
            <Header />

            <div className="container fade-in slide-up">
                <video autoPlay muted loop className="background-video">
                    <source src="/videos/bg video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="centered-text">
                    <h2 id="typing-text">Welcome to Global Icon of Luxury!</h2><br />
                    <p>Discover the Luxury with us!</p>
                </div>
            </div>

            <div className="wrapper">
                <h3 className="heading">Our Packages</h3>
                <div className="carousel">
                    {Array.isArray(destinations) && destinations.length > 0 ? (
                        destinations.map(destination => (
                            <div className="box" key={destination.id}>
                                <div className="image">
                                    <h3><i className="fas fa-map-marker-alt"></i>{destination.attributes.Title}</h3>
                                    <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${destination.attributes.Image.data[0].attributes.url}`} alt={destination.attributes.Title} />
                                </div>
                                <div className="content">
                                    <a
                                        href={`/Booking/${destination.attributes.Title.trim().replace(/\s+/g, '-').replace(/-+$/, '')}`}
                                    >
                                        <p className="btn">Explore Our Range</p>
                                    </a>


                                </div>
                            </div>
                        ))

                    ) : (
                        <p>No destinations available.</p>
                    )}
                </div>
                <i id="left" className="fa-solid fa-angle-left"></i>
                <i id="right" className="fa-solid fa-angle-right"></i>
            </div>

            <div className="containerr">
                <h3 className="heading">Hand Picked Rooms</h3>
                <div className="room-grid">
                    <div className="room-card">
                        <img src="/Images/deluxe room.svg" alt="Deluxe Suite" className="room-image" />
                        <div className="details-popup">
                            <h3>Deluxe Suite</h3>
                            <p>Well-appointed rooms designed for guests who desire a more.</p>
                            <p className="price">Rs.4399/night</p>
                        </div>
                    </div>
                    <div className="room-card">
                        <img src="/Images/family room.svg" alt="Family Suite" className="room-image" />
                        <div className="details-popup">
                            <h3>Family Suite</h3>
                            <p>Consist of multiple rooms and a common living area.</p>
                            <p className="price">Rs.5599/night</p>
                        </div>
                    </div>
                    <div className="room-card">
                        <img src="/Images/luxury room.svg" alt="Luxury Penthouse" className="room-image" />
                        <div className="details-popup">
                            <h3>Luxury Penthouse</h3>
                            <p>Top-tier accommodation, often located on the highest floor.</p>
                            <p className="price">Rs.6999/night</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text">
                <div class="text-section">
                    <h1>Meet Our Luxury Places</h1><br />
                    <p>Whether you're seeking a cozy and exclusive hideaway or an immersive journey beneath the surface, we
                        promise to provide an unforgettable stay, where the depths of comfort and excitement await your
                        arrival.</p>
                </div>
                <div class="image-section">
                    <img src="/Images/room.svg" alt="Luxury Room" style={{ height: '280px', width: '370px' }} />
                </div>
            </div>
            <div className="containers">
                <h3 className="heading">Core Features</h3>
                <section className="core-features">
                    <div className="feature">
                        <i className="fas fa-thumbs-up"></i>
                        <h3>High Rating</h3><br />
                        <p>We take pride in curating a selection of hotels that consistently receive high ratings and positive reviews.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-clock"></i>
                        <h3>Quite Hours</h3><br />
                        <p>We understand that peace and uninterrupted rest are essential for a rejuvenating experience.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-map-marker-alt"></i>
                        <h3>Best Location</h3><br />
                        <p>At our hotel booking website, we take pride in offering accommodations in the most prime and sought-after locations.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-times"></i>
                        <h3>Free Cancellation</h3><br />
                        <p>We understand that travel plans can change unexpectedly, which is why we offer the flexibility of free cancellation.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-money-bill-wave"></i>
                        <h3>Payment Options</h3><br />
                        <p>Our hotel booking website offers a range of convenient payment options to suit your preferences.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-question-circle"></i>
                        <h3>24/7 Customer Support</h3><br />
                        <p>Provide round-the-clock customer support through chatbots, email, or phone to assist with bookings and inquiries.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-globe"></i>
                        <h3>Virtual Tours</h3><br />
                        <p>Provide virtual tours of hotel rooms and facilities to give potential guests a better sense of the accommodations.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-comment-dots"></i>
                        <h3>Special Requests</h3><br />
                        <p>Allow guests to make special requests during booking, such as room preferences, dietary needs, or accessibility requirements.</p>
                    </div>
                </section>
            </div>

            <Footer />
            <a href="#arrow" className="top"><i className="fas fa-arrow-up"></i></a>
        </div>
        </>
    );
};

export default Home;
