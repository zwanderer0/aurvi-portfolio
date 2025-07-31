// Literary Website JavaScript - Inspired by Hello Heco's elegant interactions
class LiteraryWebsite {
    constructor() {
        this.scrollElements = [];
        this.heroImage = null;
        this.lastScrollY = 0;
        this.ticking = false;
        this.cursor = null;
        this.wavyPosition = 0;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        this.setupNavigationEffects();
        this.setupHeroAnimations();
        this.setupParallaxEffects();
        this.setupIntersectionObserver();
        this.setupCustomCursor();
        this.setupWavyAnimations();
        
        // Initialize hero image reference
        this.heroImage = document.querySelector('.hero-image');
        
        // Start animation loop
        this.startAnimationLoop();
        
        console.log('Literary website initialized');
    }

    setupScrollAnimations() {
        // Collect all elements that need scroll-based animations
        this.scrollElements = [
            ...document.querySelectorAll('.scroll-reveal'),
            ...document.querySelectorAll('.writing-entry'),
            ...document.querySelectorAll('.award-item'),
            ...document.querySelectorAll('.interview-item')
        ];
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate offset for fixed navigation
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupNavigationEffects() {
        const nav = document.querySelector('.nav');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Active navigation link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let currentSection = '';
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 200;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupHeroAnimations() {
        // Staggered hero text animation
        const heroText = document.querySelector('.hero-text');
        const heroIntro = document.querySelector('.hero-intro');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const floatingAwards = document.querySelector('.floating-awards');

        if (heroText && heroIntro) {
            // Split text into words for animation
            this.animateTextWords(heroIntro);
        }

        // Hero image scroll effect
        window.addEventListener('scroll', () => {
            this.updateHeroImageScroll();
        });
    }

    animateTextWords(element) {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.6s ease ${index * 0.1}s`;
            element.appendChild(span);
        });

        // Trigger animation after a short delay
        setTimeout(() => {
            element.querySelectorAll('span').forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }, 500);
    }

    setupParallaxEffects() {
        // Subtle parallax for hero section
        const heroSection = document.querySelector('.hero-about');
        
        window.addEventListener('scroll', () => {
            if (heroSection) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });

        // Floating animation for awards
        const awards = document.querySelectorAll('.award-floating');
        awards.forEach((award, index) => {
            award.addEventListener('mouseenter', () => {
                award.style.transform = `translateY(-8px) rotate(${Math.random() * 4 - 2}deg)`;
            });
            
            award.addEventListener('mouseleave', () => {
                award.style.transform = 'translateY(0) rotate(0deg)';
            });
            
            // Subtle floating animation
            setInterval(() => {
                if (!award.matches(':hover')) {
                    const floatY = Math.sin(Date.now() * 0.001 + index) * 2;
                    award.style.transform = `translateY(${floatY}px)`;
                }
            }, 50);
        });
    }

    setupIntersectionObserver() {
        // Create intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation for grouped elements
                    if (entry.target.classList.contains('writing-entry') || 
                        entry.target.classList.contains('award-item') ||
                        entry.target.classList.contains('interview-item')) {
                        
                        const siblings = Array.from(entry.target.parentNode.children);
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);

        // Observe all scroll elements
        this.scrollElements.forEach(el => observer.observe(el));
    }

    updateHeroImageScroll() {
        if (!this.heroImage) return;

        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const heroImageTop = this.heroImage.offsetTop;
        
        // Calculate when to start fading
        const fadeStart = windowHeight * 0.5;
        const fadeEnd = windowHeight * 1.2;
        
        if (scrolled >= fadeStart && scrolled <= fadeEnd) {
            const fadeProgress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
            const opacity = 1 - fadeProgress;
            const scale = 1 - (fadeProgress * 0.1);
            const translateY = fadeProgress * 40;
            
            this.heroImage.style.opacity = opacity;
            this.heroImage.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        } else if (scrolled > fadeEnd) {
            this.heroImage.classList.add('scroll-fade');
        } else {
            this.heroImage.classList.remove('scroll-fade');
            this.heroImage.style.opacity = '1';
            this.heroImage.style.transform = 'scale(1) translateY(0)';
        }
    }

    startAnimationLoop() {
        // Smooth animation loop using requestAnimationFrame
        const animate = () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateAnimations();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        };

        // Throttled scroll handler
        window.addEventListener('scroll', () => {
            this.lastScrollY = window.scrollY;
            animate();
        });

        // Initial animation call
        animate();
    }

    updateAnimations() {
        // Update any frame-based animations here
        this.updateFloatingElements();
    }

    updateFloatingElements() {
        // Subtle floating animation for various elements
        const time = Date.now() * 0.001;
        
        // Float writing entries slightly
        document.querySelectorAll('.writing-entry.visible').forEach((entry, index) => {
            if (!entry.matches(':hover')) {
                const floatOffset = Math.sin(time + index * 0.5) * 1.5;
                entry.style.transform = `translateY(${floatOffset}px)`;
            }
        });
    }

    // Utility methods
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // Add magnetic effect to interactive elements
    addMagneticEffect(element, strength = 0.3) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    }

    // Advanced hover effects for writing entries
    setupAdvancedHoverEffects() {
        document.querySelectorAll('.writing-link-wrapper').forEach(wrapper => {
            const title = wrapper.querySelector('.writing-title-large');
            
            wrapper.addEventListener('mouseenter', () => {
                // Subtle scale and glow effect
                wrapper.style.transform = 'translateY(-12px) scale(1.02)';
                wrapper.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                
                if (title) {
                    title.style.transform = 'translateX(8px)';
                }
            });
            
            wrapper.addEventListener('mouseleave', () => {
                wrapper.style.transform = 'translateY(0) scale(1)';
                wrapper.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.06)';
                
                if (title) {
                    title.style.transform = 'translateX(0)';
                }
            });
        });
    }

    setupCustomCursor() {
        // Create custom cursor element
        this.cursor = document.createElement('div');
        this.cursor.classList.add('cursor');
        document.body.appendChild(this.cursor);

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            if (this.cursor) {
                this.cursor.style.left = e.clientX + 'px';
                this.cursor.style.top = e.clientY + 'px';
            }
        });

        // Add hover effects
        const hoverElements = document.querySelectorAll('a, button, .writing-link-wrapper, .contact-link, .award-floating');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });

        // Add click effect
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
        });
    }

    setupWavyAnimations() {
        // Hello Heco style wavy background animation
        const updateWavyBackgrounds = () => {
            this.wavyPosition -= 1;
            
            // Update CSS custom properties for wavy animations
            document.documentElement.style.setProperty('--wavy-position', this.wavyPosition + 'px');
        };

        // Run wavy animation at 50fps like Hello Heco
        setInterval(updateWavyBackgrounds, 20);
    }

    setupAdvancedScrollEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Transform writing entries based on scroll position
            document.querySelectorAll('.writing-entry').forEach((entry, index) => {
                const rect = entry.getBoundingClientRect();
                const elementTop = rect.top + scrolled;
                const elementCenter = elementTop + rect.height / 2;
                const screenCenter = scrolled + windowHeight / 2;
                
                const distance = Math.abs(elementCenter - screenCenter);
                const maxDistance = windowHeight;
                const proximity = 1 - Math.min(distance / maxDistance, 1);
                
                // Apply subtle 3D transform based on proximity to center
                const rotateY = (screenCenter - elementCenter) / maxDistance * 2;
                const scale = 0.98 + proximity * 0.02;
                
                entry.style.transform = `
                    perspective(1000px) 
                    rotateY(${rotateY}deg) 
                    scale(${scale})
                `;
                entry.style.opacity = 0.8 + proximity * 0.2;
            });
        });
    }

    setupPageTransitions() {
        // Smooth page entry
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            document.body.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', () => {
    const website = new LiteraryWebsite();
    
    // Add magnetic effects to contact links
    document.querySelectorAll('.contact-link').forEach(link => {
        website.addMagneticEffect(link, 0.2);
    });
    
    // Setup advanced hover effects
    website.setupAdvancedHoverEffects();
    
    // Setup advanced scroll effects
    website.setupAdvancedScrollEffects();
    
    // Setup page transitions
    website.setupPageTransitions();
});

// Smooth page transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
});

// Preload critical images
const preloadImages = [
    'aurvi.jpeg'
];

preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Export for external use
window.LiteraryWebsite = LiteraryWebsite;