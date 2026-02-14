/**
 * AKcelerate Premium Animations & Interactions
 * Smooth, rich animations for enhanced user experience
 */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initNavbarEffects();
    initCounterAnimations();
    initParallaxEffects();
    initCursorEffects();
    initSmoothScroll();
});

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.service-card, .blog-card, .pricing-card, .credential-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

/**
 * Premium Navbar Effects
 */
function initNavbarEffects() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Animated Counter for Stats
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number-large');
    let animated = false;
    
    const animateCounter = (counter) => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isCurrency = target.includes('₹') || target.includes('Cr');
        const isPlus = target.includes('+');
        
        // Extract number
        let number = parseInt(target.replace(/[^0-9]/g, ''));
        if (isNaN(number)) return;
        
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isCurrency) {
                counter.textContent = '₹' + displayValue + 'Cr+';
            } else if (isPercentage) {
                counter.textContent = displayValue + '%';
            } else if (isPlus) {
                counter.textContent = displayValue + '+';
            } else {
                counter.textContent = displayValue + (target.includes('-') ? '-' + target.split('-')[1] : '');
            }
        }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                counters.forEach((counter, index) => {
                    setTimeout(() => animateCounter(counter), index * 200);
                });
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.credibility-section-premium');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/**
 * Parallax Effects
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-premium');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/**
 * Custom Cursor Effect (Premium Touch)
 */
function initCursorEffects() {
    // Create cursor elements
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    
    cursor.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(102, 126, 234, 0.5);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, border-color 0.3s;
        z-index: 9999;
        display: none;
    `;
    
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 10000;
        display: none;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    // Only on desktop
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        
        // Enlarge cursor on hover over links/buttons
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .blog-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
                cursor.style.borderColor = 'rgba(139, 92, 246, 0.8)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.borderColor = 'rgba(102, 126, 234, 0.5)';
            });
        });
    }
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
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
}

/**
 * Add premium loading animation
 */
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

/**
 * Service card tilt effect
 */
function initCardTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Initialize tilt effect after delay
setTimeout(initCardTiltEffect, 500);

/**
 * Premium button ripple effect
 */
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    ripple.style.cssText += `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    `;
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple to all buttons
document.querySelectorAll('.btn-primary-large, .btn-primary, button').forEach(button => {
    button.addEventListener('click', createRipple);
});

/**
 * Text reveal animation
 */
function initTextReveal() {
    const textElements = document.querySelectorAll('.hero-title-premium, .hero-subtitle-premium, .section-title-premium');
    
    textElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        el.style.opacity = '1';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.03}s`;
            el.appendChild(span);
        });
    });
}

// Add fadeInChar animation
const charStyle = document.createElement('style');
charStyle.textContent = `
    @keyframes fadeInChar {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(charStyle);

// Initialize text reveal on load
window.addEventListener('load', () => {
    setTimeout(initTextReveal, 300);
});
