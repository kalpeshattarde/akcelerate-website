// ==========================================
// AKcelerate Website - Main JavaScript
// Premium Executive Design
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ==========================================
    // Navigation Scroll Effect - Premium
    // ==========================================
    
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.background = '#FFFFFF';
            nav.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ==========================================
    // Contact Form Handling - Premium
    // ==========================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data (simplified for premium form)
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                message: document.getElementById('message').value,
                revenue: document.getElementById('revenue')?.value || '',
                challenge: document.getElementById('challenge')?.value || '',
                timeline: document.getElementById('timeline')?.value || ''
            };
            
            // Get form elements
            const form = document.getElementById('contactForm');
            const successMessage = document.getElementById('formSuccess');
            const errorMessage = document.getElementById('formError');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            submitButton.style.opacity = '0.6';
            
            try {
                // Send to backend API
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    // Hide form, show success message
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Smooth scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Log to console (for development)
                    console.log('✓ Form submitted successfully:', formData);
                    
                    // Optional: Reset form after delay
                    setTimeout(() => {
                        form.reset();
                    }, 1000);
                    
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
                
            } catch (error) {
                console.error('✗ Form submission error:', error);
                
                // Hide form, show error message
                form.style.display = 'none';
                errorMessage.style.display = 'block';
                
                // Re-enable form after 3 seconds
                setTimeout(() => {
                    form.style.display = 'flex';
                    errorMessage.style.display = 'none';
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.style.opacity = '1';
                }, 3000);
            }
        });
    }
    
    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // ==========================================
    // Form Validation Enhancement
    // ==========================================
    
    const formInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    
    formInputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
    
    // ==========================================
    // Animations on Scroll (Optional Enhancement)
    // ==========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.problem-card, .solution-card, .stat-card, .process-step, .faq-item, .case-study');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ==========================================
    // Mobile Menu Toggle (if needed in future)
    // ==========================================
    
    // Placeholder for mobile menu functionality
    // Can be implemented when mobile menu is added to HTML
    
    console.log('✓ AKcelerate website scripts loaded successfully');
});

// ==========================================
// CSS for fade-in animation (add to styles.css or inline)
// ==========================================

// Add this CSS to your styles.css file for the fade-in effect:
/*
.problem-card,
.solution-card,
.stat-card,
.process-step,
.faq-item,
.case-study {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.problem-card.fade-in,
.solution-card.fade-in,
.stat-card.fade-in,
.process-step.fade-in,
.faq-item.fade-in,
.case-study.fade-in {
    opacity: 1;
    transform: translateY(0);
}
*/
