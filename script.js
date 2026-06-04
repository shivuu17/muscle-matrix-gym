document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    const body = document.body;

    const toggleMenu = () => {
        const isOpened = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isOpened);
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (!isOpened) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, no need to observe anymore for performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // 3. Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(15, 15, 15, 0.95)';
        }
        
        lastScroll = currentScroll;
    });
});

// 5. Injected Mobile Overlay Styles for Clean UI
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background: #0a0a0a;
            padding: 10vh 2rem;
            gap: 2.5rem;
            text-align: center;
            z-index: 1000;
            overflow-y: auto;
        }
        .nav-links.active li a {
            font-size: 2rem;
            font-family: 'Oswald', sans-serif;
            text-transform: uppercase;
        }
        .hamburger[aria-expanded="true"] span:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        .hamburger[aria-expanded="true"] span:nth-child(2) {
            opacity: 0;
        }
        .hamburger[aria-expanded="true"] span:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(style);