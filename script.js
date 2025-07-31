// Modern Portfolio JavaScript Implementation

$(function() {
    // Core wavy animation for elegant underlines
    var x = 0;
    setInterval(function() {
        x -= 1;
        $(".link-wavy:hover").css('background-position', x + 'px 100%');
    }, 20);
    
    // Keep email link always animated
    var emailX = 0;
    setInterval(function() {
        emailX -= 1;
        $(".link-wavy-header").css('background-position', emailX + 'px 100%');
    }, 20);
});

// Vanilla JS for other interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll behavior
    initSmoothScroll();
    
    // Intersection Observer for fade-in animations
    initScrollAnimations();
    
    // Navigation scroll effects
    initNavScroll();
    
    // Video background handling
    initVideoBackground();
    
    // Writing item hover effects
    initWritingHovers();
});

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animations for children
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe individual items
    document.querySelectorAll('.writing-item, .recognition-item, .interview-item').forEach(item => {
        observer.observe(item);
    });
}

function initNavScroll() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

function initVideoBackground() {
    const video = document.querySelector('.w-background-video video');
    if (video) {
        // Ensure video plays
        video.play().catch(e => {
            console.log('Video autoplay failed:', e);
        });
        
        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            video.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
        });
    }
}

function initWritingHovers() {
    const writingItems = document.querySelectorAll('.writing-item');
    
    writingItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add transform effect
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Performance optimization - throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handlers
window.addEventListener('scroll', throttle(() => {
    updateScrollProgress();
}, 100));

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Update any scroll progress indicators
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

// Initialize everything
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Start animations after load
    setTimeout(() => {
        document.querySelectorAll('.hero-line').forEach((line, index) => {
            line.style.animationDelay = `${index * 0.2}s`;
            line.classList.add('animate');
        });
    }, 100);
});