"use client";
import './glob.css';
import { useEffect, useState } from 'react';
import Header from '../components/homehead.js';
import Footer from '../components/footer.js';

export default function Home() {
  useEffect(() => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');

    const handleMenuClick = () => {
      if (navMenu.className === 'nav') {
        navMenu.className += ' responsive';
      } else {
        navMenu.className = 'nav';
      }
    };

    if (hamburgerMenu && navMenu) {
      hamburgerMenu.addEventListener('click', handleMenuClick);
    }

    // Get all the elements with class name "card"
    var cards = document.querySelectorAll(".card");
    var modals = document.querySelectorAll(".modal");
    var videos = document.querySelectorAll(".video");
    var spans = document.querySelectorAll(".close");

    // Loop through each card and add a click event listener
    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        if (modals[index] && videos[index]) {
          modals[index].style.display = "block";
          videos[index].play();
        }
      });
    });

    // Loop through each close button and add a click event listener
    spans.forEach((span, index) => {
      span.addEventListener("click", () => {
        if (modals[index] && videos[index]) {
          modals[index].style.display = "none";
          videos[index].pause();
          videos[index].currentTime = 0;
        }
      });
    });

    // Close modal when clicking outside the modal
    window.onclick = function (event) {
      modals.forEach((modal, index) => {
        if (event.target == modal) {
          modal.style.display = "none";
          if (videos[index]) {
            videos[index].pause();
            videos[index].currentTime = 0;
          }
        }
      });
    };

    // Animation on scroll
    const animateCards = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, {
      threshold: 0.1
    });

    animateCards.forEach(card => {
      observer.observe(card);
    });

    // Cleanup function
    return () => {
      if (hamburgerMenu && navMenu) {
        hamburgerMenu.removeEventListener('click', handleMenuClick);
      }
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove the stored username (or token) from local storage
    localStorage.removeItem('token'); // Remove the stored token (or username) from local storage
    setUsername(null); // Update the state
   // Redirect to the login page
  };


  return (
    <> 
      <div id="arrow">
        <Header />

        <div className="banner">
          <video autoPlay muted loop className="background-video">
            <source src="/imag/bg video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="centered-text">
            <h2 id="typing-text">Discover the most beautiful places among us!</h2><br />
          </div>
        </div>

        {/* About section */}
        <div className="card">
          <div className="image">
            <img src="/imag/ladakh.svg" alt="Card Image" />
          </div>
          <div className="contents">
            <h2 style={{ color: '#1e7898' }}>Welcome To EverTours</h2>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>
              At EVERTOUR, we are passionate about creating unforgettable travel experiences. With years of industry expertise, we specialize in curating personalized journeys tailored to our clients' preferences. Our dedicated team of travel enthusiasts is committed to providing exceptional service and insider knowledge to ensure every trip is seamless and memorable. Whether you're seeking adventure, relaxation, or cultural immersion, we're here to turn your travel dreams into reality. Discover the world with confidence, guided by our expertise and dedication to excellence.
            </p>
            <div className="atlas">
              <a href="/About" className="read-more-btn">Read more</a>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section className="services">
          <h3 className="sub-title" data-aos="fade-up">Our Services</h3>
          <div className="services-container">
            <div className="service-card" data-aos="fade-up" data-aos-delay="100">
              <i className="fas fa-globe service-icon"></i>
              <h4 className="service-title">National Tours</h4>
              <p className="service-description">Explore the diverse landscapes and rich cultural heritage of our nation with our carefully curated national tours. Discover the beauty and history of our country with guided tours, comfortable transportation, and exceptional service.</p>
            </div>
            <div className="service-card" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-ticket-alt service-icon"></i>
              <h4 className="service-title">Ticket Booking</h4>
              <p className="service-description">Simplify your travel planning with our comprehensive ticket booking service. We offer hassle-free booking for flights. Save time and effort by letting us handle your travel arrangements, providing you with a seamless journey from start to finish.</p>
            </div>
            <div className="service-card" data-aos="fade-up" data-aos-delay="300">
              <i className="fas fa-hotel service-icon"></i>
              <h4 className="service-title">Hotel Booking</h4>
              <p className="service-description">Find the perfect accommodation for your travels with our hotel booking service. Enjoy comfort, convenience, and excellent service at competitive prices, making your stay as pleasant and relaxing as possible.</p>
            </div>
          </div>
        </section>

        {/* Destination Section */}
        <div className="destination-section">
          <h2>Popular Destinations</h2>
          <div className="destination-grid">
            <div className="destination-card grid-item-large">
              <img src="/imag/ladakh.svg" alt="Thailand" />
              <div className="name">LADAKH</div>
            </div>  
            <div className="destination-card">
              <img src="/imag/lakshadeep.svg" alt="Malaysia" />
              <div className="name">LAKSHWADEEP</div>
            </div>
            <div className="destination-card">
              <img src="/imag/maharashtra.svg" alt="Australia" />
              <div className="name">MAHARASHTRA</div>
            </div>
          </div>
          <div className="arrow">
            <a href="/Destination">
              <button><i className="fas fa-arrow-right service-icon"></i></button>
            </a>
          </div>
        </div>

        {/* Steps Section */}
        <section className="steps-section">
          <h2 className="section-title">3 Steps Away!</h2>
          <div className="steps-container">
            <div className="step-card">
              <div className="icon">
                <i className="fas fa-map-marker-alt service-icon"></i>
              </div>
              <h3>Choose A Destination</h3>
              <p>Explore a variety of exciting destinations around the world. Whether you're dreaming of a tropical paradise, a cultural city experience, or an adventurous getaway, our extensive list of destinations will help you find the perfect place for your next trip.</p>
            </div>
            <div className="step-card">
              <div className="icon">
                <i className="fas fa-credit-card service-icon"></i>
              </div>
              <h3>Pay Online</h3>
              <p>Enjoy a hassle-free booking experience with our secure online payment system. Simply select your preferred destination, choose from a range of payment options, and confirm your booking in just a few clicks.</p>
            </div>
            <div className="step-card">
              <div className="icon">
                <i className="fas fa-plane service-icon"></i>
              </div>
              <h3>Fly Today</h3>
              <p>Get ready to embark on your journey with ease. Once your booking is confirmed, pack your bags and head to the airport. With our efficient and convenient flight options, you can start your adventure right away.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Back to Top Button */}
        <a href="#arrow" className="top"><i className="fas fa-arrow-up"></i></a>
      </div>
    </>
  );
}
