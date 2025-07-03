// Smooth scrolling for anchor links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.classList.remove('open');
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll animations
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
    const isMediumDevice = window.matchMedia('(min-width: 768px)').matches;

    entries.forEach(entry => {
        const animatedEl = entry.target.querySelector('.animate__animated');
        
        const id = entry.target.getAttribute('id');
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('nav-active');
            });
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('nav-active');
            }
        }

        if (animatedEl) { // Check if animated element exists
            if (isMediumDevice) { // Apply animation only on medium devices
                if (entry.isIntersecting) {
                    animatedEl.classList.remove('animate__bounceOutRight');
                    animatedEl.classList.add('animate__bounceInLeft');
                } else {
                    animatedEl.classList.remove('animate__bounceInLeft');
                    animatedEl.classList.add('animate__bounceOutRight');
                }
            } else { // On mobile devices, ensure elements are visible and remove animation classes
                animatedEl.classList.remove('animate__bounceInLeft', 'animate__bounceOutRight', 'animate__animated');
                animatedEl.style.opacity = '1';
                animatedEl.style.transform = 'none';
            }
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenuButton.classList.toggle('open');
});

// Scroll-based navbar hide/show and scroll indicator
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar-blur');
const scrollIndicator = document.getElementById('scroll-indicator');

window.addEventListener('scroll', () => {
    // Navbar hide/show
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.classList.add('navbar-hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('navbar-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

    // Scroll indicator
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    scrollIndicator.style.width = scrolled + '%';
});
