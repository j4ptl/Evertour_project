document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            var navMenu = document.getElementById('navMenu');
            if (navMenu.className === 'nav') {
                navMenu.className += ' responsive';
            } else {
                navMenu.className = 'nav';
            }
        });
    }

    // Add class to trigger CSS animations
    const descriptionElements = document.querySelectorAll('.description, .image-description img');
    descriptionElements.forEach(element => {
        element.classList.add('animated');
    });

    // Add class to trigger CSS animation
    const evertoursLogo = document.getElementById('evertours-logo');
    if (evertoursLogo) {
        evertoursLogo.classList.add('animated');
    }

    // Observer configuration
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Add observer to elements with specified classes
    document.querySelectorAll('.fade-in-on-scroll, .slide-up-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // JavaScript for triggering animations on scroll and in view
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.fade-in, .slide-up').forEach(element => {
        animationObserver.observe(element);
    });

    // Form submission handling
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const firstname = document.querySelector('input[type="text"]').value;
            const email = document.querySelector('input[type="email"]').value;
            const subject = document.querySelector('input[type="text"]:nth-child(3)').value;
            const message = document.querySelector('textarea').value;

            if (firstname && email && subject && message) {
                alert('Message sent successfully!');
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});
