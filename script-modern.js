// Modern JavaScript for Aurvi Sharma's website
class AurviWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObservers();
        this.setupScrollEffects();
        this.setupTypewriterEffects();
        this.setupAnimations();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Throttled scroll events
        let scrollTimeout = null;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = requestAnimationFrame(() => {
                this.updateScrollProgress();
                this.updateHeroImage();
                this.updateNavigation();
                this.updateDotNavigation();
            });
        });

        // Resize handler
        window.addEventListener('resize', () => {
            this.updateHeroImage();
        });

        // Dot navigation clicks
        document.querySelectorAll('.dot-nav-item').forEach(dot => {
            dot.addEventListener('click', () => {
                const section = dot.getAttribute('data-section');
                const target = document.getElementById(section);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    setupIntersectionObservers() {
        // Animate elements when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe writing entries
        document.querySelectorAll('.writing-entry').forEach(entry => {
            observer.observe(entry);
        });

        // Observe award items
        document.querySelectorAll('.award-item').forEach(item => {
            observer.observe(item);
        });

        // Observe interview items
        document.querySelectorAll('.interview-item').forEach(item => {
            observer.observe(item);
        });
    }

    setupScrollEffects() {
        // Parallax effect for hero section
        const hero = document.querySelector('.hero-about');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }

        // Floating animation for award badges
        document.querySelectorAll('.award-badge').forEach((badge, index) => {
            badge.style.animationDelay = `${index * 0.1}s`;
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'translateY(-8px) rotate(2deg)';
            });
            badge.addEventListener('mouseleave', () => {
                badge.style.transform = 'translateY(0) rotate(0deg)';
            });
        });
    }

    setupTypewriterEffects() {
        // Typewriter effect for hero intro
        const heroIntro = document.querySelector('.hero-intro');
        if (heroIntro) {
            const text = heroIntro.textContent;
            heroIntro.textContent = '';
            heroIntro.style.opacity = '1';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroIntro.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Start typewriter after a delay
            setTimeout(typeWriter, 1000);
        }
    }

    setupAnimations() {
        // Stagger animation for writing entries
        document.querySelectorAll('.writing-entry').forEach((entry, index) => {
            entry.style.animationDelay = `${index * 0.1}s`;
        });

        // Hover effects for writing titles
        document.querySelectorAll('.writing-link-wrapper').forEach(link => {
            link.addEventListener('mouseenter', () => {
                const title = link.querySelector('.writing-title-large');
                if (title) {
                    title.style.transform = 'translateX(10px)';
                }
            });
            
            link.addEventListener('mouseleave', () => {
                const title = link.querySelector('.writing-title-large');
                if (title) {
                    title.style.transform = 'translateX(0)';
                }
            });
        });

        // Magnetic effect for buttons
        document.querySelectorAll('.contact-link, .award-badge').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    updateScrollProgress() {
        const progress = document.querySelector('.scroll-progress');
        if (progress) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progress.style.width = `${scrollPercent}%`;
        }
    }

    updateHeroImage() {
        const heroImage = document.querySelector('.hero-image');
        const aboutSection = document.getElementById('about');
        const writingSection = document.getElementById('writing');
        
        if (!heroImage || !aboutSection) return;

        const scrolled = window.pageYOffset;
        const aboutTop = aboutSection.offsetTop;
        const aboutBottom = aboutTop + aboutSection.offsetHeight;
        const writingTop = writingSection ? writingSection.offsetTop : aboutBottom + 500;
        
        // Smooth fade out before writing section
        const fadeStart = writingTop - 600;
        const fadeEnd = writingTop - 200;
        
        if (scrolled >= fadeStart && scrolled <= fadeEnd) {
            const fadeProgress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
            heroImage.style.opacity = 1 - fadeProgress;
            heroImage.style.transform = `scale(${1 - fadeProgress * 0.1}) translateY(${fadeProgress * 30}px)`;
        } else if (scrolled > fadeEnd) {
            heroImage.classList.add('fade-out');
        } else {
            heroImage.classList.remove('fade-out');
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1) translateY(0)';
        }
    }

    updateNavigation() {
        const nav = document.querySelector('.nav');
        if (nav) {
            if (window.pageYOffset > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    }

    updateDotNavigation() {
        const sections = ['home', 'about', 'writing', 'awards', 'interviews', 'contact'];
        const dots = document.querySelectorAll('.dot-nav-item');
        const scrollPos = window.pageYOffset + window.innerHeight / 2;
        
        let activeSection = 'home';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    activeSection = sectionId;
                }
            }
        });
        
        dots.forEach(dot => {
            const section = dot.getAttribute('data-section');
            if (section === activeSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Utility method for smooth animations
    animateValue(element, start, end, duration, callback) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + (end - start) * easeOutCubic;
            
            if (callback) callback(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Modern loading states
    showLoading() {
        document.body.classList.add('loading');
    }

    hideLoading() {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const website = new AurviWebsite();
    
    // Hide loading after everything is set up
    setTimeout(() => {
        website.hideLoading();
    }, 500);
});

// Preload images for smoother experience
const preloadImages = () => {
    const images = ['aurvi.jpeg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

preloadImages();

// Export for potential external use
window.AurviWebsite = AurviWebsite;