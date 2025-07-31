// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scrollProgress').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Intersection Observer for section animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Hero image visibility control
function updateHeroImagePosition() {
    const heroImage = document.querySelector('.hero-image');
    const aboutSection = document.getElementById('about');
    const writingSection = document.getElementById('writing');
    
    if (!heroImage || !aboutSection || !writingSection) return;
    
    const scrolled = window.pageYOffset;
    
    // Calculate when About section starts and Writing section starts
    const aboutTop = aboutSection.offsetTop;
    const writingTop = writingSection.offsetTop;
    
    if (scrolled < aboutTop - 100) {
        // Keep image fixed on right during Hero section
        heroImage.style.position = 'fixed';
        heroImage.style.top = '120px';
        heroImage.style.right = 'calc((100vw - 1200px) / 2 + 2rem)';
        heroImage.style.transform = 'translateY(0)';
        heroImage.style.opacity = '1';
        heroImage.style.display = 'block';
    } else if (scrolled < writingTop - 200) {
        // Position image alongside About section content when scrolled into About
        heroImage.style.position = 'absolute';
        heroImage.style.top = (aboutTop + 80) + 'px';
        heroImage.style.right = 'calc((100vw - 1200px) / 2 + 2rem)';
        heroImage.style.transform = 'translateY(0)';
        heroImage.style.opacity = '1';
        heroImage.style.display = 'block';
    } else {
        // Hide image when Writing section starts
        heroImage.style.display = 'none';
    }
}

window.addEventListener('scroll', updateHeroImagePosition);

// Navigation background opacity on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Text animation on scroll
const animateText = () => {
    const textElements = document.querySelectorAll('.text-highlight');
    textElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.backgroundSize = '100% 88%';
        }
    });
};

window.addEventListener('scroll', animateText);

// Dot Navigation Functionality
function updateDotNavigation() {
    const sections = ['home', 'about', 'writing', 'awards', 'interviews', 'contact'];
    const dotItems = document.querySelectorAll('.dot-nav-item');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    let activeSection = 'home';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = sectionId;
            }
        }
    });

    dotItems.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === activeSection) {
            dot.classList.add('active');
        }
    });
}

// Dot navigation click handlers
document.querySelectorAll('.dot-nav-item').forEach(dot => {
    dot.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', updateDotNavigation);

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src || img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Typewriter effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Update scroll progress
    updateScrollProgress();
    
    // Initialize hero image positioning
    updateHeroImagePosition();
    
    // Initialize dot navigation
    updateDotNavigation();
});