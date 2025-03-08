document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for smooth animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-floatUp');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .pricing-card, .step, .section-header, .integration-logo, .faq-item, .waitlist-form, .waitlist-image').forEach(element => {
        animateOnScroll.observe(element);
    });

    // Enhanced Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            ctaButtons.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth Testimonial Transitions
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateX(20px)';
            setTimeout(() => {
                testimonial.classList.remove('active');
            }, 300);
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        setTimeout(() => {
            testimonials[index].classList.add('active');
            testimonials[index].style.opacity = '1';
            testimonials[index].style.transform = 'translateX(0)';
            dots[index].classList.add('active');
        }, 300);
    }
    
    function startTestimonialInterval() {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Initialize testimonials
    showTestimonial(0);
    startTestimonialInterval();

    // Enhanced Form Validation
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
        const formInputs = waitlistForm.querySelectorAll('input, select, textarea');
        
        formInputs.forEach(input => {
            // Floating label effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', () => {
                validateInput(input);
            });
        });
        
        function validateInput(input) {
            const parent = input.parentElement;
            
            if (input.hasAttribute('required') && !input.value.trim()) {
                parent.classList.add('error');
                return false;
            }
            
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    parent.classList.add('error');
                    parent.setAttribute('data-error', 'Please enter a valid email address');
                    return false;
                }
            }
            
            parent.classList.remove('error');
            return true;
        }
        
        waitlistForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) return;
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitButton.disabled = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                this.style.opacity = '0';
                this.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    this.style.display = 'none';
                    const successMessage = document.getElementById('waitlist-success');
                    successMessage.style.display = 'block';
                    setTimeout(() => {
                        successMessage.style.opacity = '1';
                        successMessage.style.transform = 'translateY(0)';
                    }, 50);
                }, 300);
                
                // Store submission in localStorage
                localStorage.setItem('finflow_waitlist', JSON.stringify({
                    submitted: true,
                    timestamp: new Date().toISOString()
                }));
            } catch (error) {
                console.error('Submission error:', error);
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Smooth Scroll with Progress Indicator
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                    mobileMenuBtn.click();
                }
            }
        });
    });

    // Enhanced FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Scroll Progress Indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress';
    document.body.appendChild(progressIndicator);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressIndicator.style.width = `${progress}%`;
    });

    // Back to Top Button with Smooth Animation
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 