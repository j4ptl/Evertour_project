"use client";
import { useState, useEffect } from 'react';
import './about.css';
import Link from 'next/link';
import Header from '../../components/header.js';
import Footer from '../../components/footer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Loader from '../../components/loading.js';
const About = () => {
    const [formData, setFormData] = useState({
        Firstname: '',
        Email: '',
        Subject: '',
        Message: ''
    });
    const [loading, setLoading] = useState(true);
    const [teamMembers, setTeamMembers] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.Firstname && formData.Email && formData.Subject && formData.Message) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-uses`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data: formData })
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Form submission successful:', responseData);
                    alert('Message sent successfully!');
                    setFormData({
                        Firstname: '',
                        Email: '',
                        Subject: '',
                        Message: ''
                    });
                } else {
                    const errorMessage = await response.text();
                    console.error('Error submitting form:', errorMessage);
                    alert('An error occurred. Please try again later.');
                }
              
            } catch (error) {
                console.error('Error submitting form:', error.message);
                alert('An error occurred. Please try again later.');
            }
        } else {
            alert('Please fill in all fields.');
        }
    };

    useEffect(() => {
        setLoading(false);
        // IntersectionObserver code
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        document.querySelectorAll('.fade-in-on-scroll, .slide-up-on-scroll').forEach(element => {
            observer.observe(element);
        });

     
        // Fetch team members data
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/team-members?populate=*`);
                if (response.ok) {
                    const data = await response.json();
                    setTeamMembers(data.data);
          
                } else {
                    console.error('Failed to fetch team members');
                }
            } catch (error) {
                console.error('Error fetching team members:', error);
            }
        };

        fetchTeamMembers();
    }, []);

    
    if (loading) return <Loader/>;
   
   
    return (
        <>
            <div id="arrow">
                <Header />
                <div className="container fade-in-on-scroll slide-up">
                    <video autoPlay muted loop className="background-video">
                        <source src="/img/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="centered-text">
                        <h2 id="typing-text">About Us!</h2><br />
                    </div>
                </div>
                <div className="desc fade-in-on-scroll slide-up-on-scroll">
                    <div className="image-description">
                        <img src="/img/bg.svg" alt="Sample" style={{
                            maxWidth: '100%',
                            height: '350px',
                            margin: '10px',
                            marginTop: '70px',
                            borderRadius: '10%',
                            paddingRight: '30px'
                        }} />
                        <div className="description">
                            <h2>Welcome To EverTours</h2>
                            <p>At EVERTOUR, we believe in crafting extraordinary travel experiences that leave lasting memories. We excel in designing bespoke journeys tailored to meet our clients' unique desires. Our team of travel aficionados is devoted to delivering exceptional service and sharing insider tips to make every trip smooth and unforgettable. Whether you're looking for adventure, relaxation, or cultural exploration, we're here to bring your travel dreams to life. Explore the world with confidence, guided by our expertise and unwavering commitment to excellence.
                            </p><br />
                            <p>With a user-friendly interface and a secure booking system, EVERTOUR guarantees a seamless experience for our users. Regular updates and top-notch customer support services ensure reliability and high user satisfaction. Through strategic marketing efforts, our website aims to attract travelers and establish itself as a trusted name in the travel industry.</p><br />
                        </div>
                    </div>
                </div>
                <div className="team fade-in-on-scroll slide-up-on-scroll">
                    <h2>Meet Our Team!</h2>
                    <div className="cards-container">
                        {teamMembers.map((member) => (
                            <div className="card" key={member.id}>
                                <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.attributes.Image.data[0].attributes.url}`} alt={member.attributes.Name} />
                                <div className="card-info">
                                    <h2>{member.attributes.Name}</h2>
                                    <p>{member.attributes.Category}</p>
                                    <div className="social-icons">
                                        <a href={member.attributes.LinkedIn} target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faLinkedin} style={{ color: '#2e2a2a' }} />
                                        </a>
                                        <a href={member.attributes.GitHub} target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faGithub} style={{ color: '#2e2a2a' }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <h2 style={{ marginBottom: '30px' }}>Get in Touch with Us!</h2>

                <div className="confo fade-in-on-scroll slide-up-on-scroll">
                    <div className="contact">
                        <div className="contact-form">
                            <form onSubmit={handleSubmit}>
                                <div className='input-group'>
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="Your firstname" value={formData.Firstname}
                                        onChange={handleChange} name='Firstname' required />
                                </div>
                                <div className='input-group'>
                                    <i className="fas fa-envelope"></i>
                                    <input type="email" placeholder="Your email address" value={formData.Email}
                                        onChange={handleChange} name='Email' required />
                                </div>
                                <div className='input-group'>
                                    <i className="fas fa-tag"></i>
                                    <input type="text" placeholder="Your subject of this message" value={formData.Subject}
                                        onChange={handleChange} name='Subject' required />
                                </div>
                                <div className='input-group'>
                                    <i className="fas fa-comment"></i>
                                    <textarea placeholder="Write us something" name='Message' value={formData.Message}
                                        onChange={handleChange} required></textarea>
                                </div>
                                <button type="submit">Send Message</button>
                            </form>
                        </div>
                        <div className="contact-info">
                            <p><i className="fas fa-map-marker-alt"></i> 1/S, Arjun Acad, Sarkhej, Ahmedabad, Gujarat</p>
                            <p><i className="fas fa-phone"></i> +91 1235235598</p>
                            <p><i className="fas fa-envelope"></i> evertours864@gmail.com</p>
                            <p><i className="fas fa-globe"></i> Etours.com</p>
                        </div>
                    </div>
                </div>
                <Footer />
                <Link href="" className="top"><i className="fas fa-arrow-up"></i></Link>
            </div>
        </>
    );
};

export default About;
