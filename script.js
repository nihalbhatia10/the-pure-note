// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-in, .reveal-text').forEach(el => {
    observer.observe(el);
});

// Parallax Effect & Navbar Scroll
const heroImg = document.querySelector('.parallax-img');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (window.innerWidth > 768 && heroImg) {
        heroImg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }

    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
