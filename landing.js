document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            ctaButtons.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            if (mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial
        if (testimonials[index]) {
            testimonials[index].style.display = 'block';
            // Add a small delay before adding the active class for animation
            setTimeout(() => {
                testimonials[index].classList.add('active');
            }, 50);
        }
        
        // Add active class to the selected dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    // Initialize testimonial slider
    showTestimonial(currentTestimonial);
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
            // Reset the interval when manually changing testimonials
            clearInterval(testimonialInterval);
            startTestimonialInterval();
        });
    });
    
    // Function to start the testimonial interval
    function startTestimonialInterval() {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 6000);
    }
    
    // Start auto-rotate testimonials
    startTestimonialInterval();
    
    // Pause rotation when hovering over testimonials
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            startTestimonialInterval();
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Pricing Toggle (Monthly/Annual)
    const pricingToggle = document.getElementById('pricing-toggle');
    const prices = document.querySelectorAll('.price');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            
            prices.forEach(price => {
                const monthlyPrice = price.getAttribute('data-monthly');
                const annualPrice = price.getAttribute('data-annual');
                
                if (isAnnual && annualPrice) {
                    price.innerHTML = annualPrice + '<span>/month</span><span class="billed-annually">billed annually</span>';
                } else if (monthlyPrice) {
                    price.innerHTML = monthlyPrice + '<span>/month</span>';
                }
            });
        });
    }
    
    // Video Demo Play Button
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const playButton = document.querySelector('.play-button');
    
    if (videoPlaceholder && playButton) {
        playButton.addEventListener('click', function() {
            // In a real implementation, you would replace the placeholder with an actual video
            // For this example, we'll just show an alert
            alert('Video player would start here in the actual implementation.');
            
            // Example of how you might implement this:
            // const videoIframe = document.createElement('iframe');
            // videoIframe.src = 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1';
            // videoIframe.width = '100%';
            // videoIframe.height = '100%';
            // videoIframe.frameBorder = '0';
            // videoIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            // videoIframe.allowFullscreen = true;
            // videoPlaceholder.innerHTML = '';
            // videoPlaceholder.appendChild(videoIframe);
        });
    }
    
    // Waitlist Form Submission
    const waitlistForm = document.getElementById('waitlist-form');
    const waitlistSuccess = document.getElementById('waitlist-success');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                companySize: document.getElementById('company-size').value,
                interest: document.getElementById('interest') ? document.getElementById('interest').value : '',
                newsletter: document.getElementById('newsletter') ? document.getElementById('newsletter').checked : false
            };
            
            // In a real application, you would send this data to your server
            // For this example, we'll just simulate a successful submission
            console.log('Waitlist submission:', formData);
            
            // Show loading state
            const submitButton = waitlistForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitButton.disabled = true;
            
            // Simulate server request
            setTimeout(() => {
                // Show success message
                waitlistForm.style.display = 'none';
                waitlistSuccess.style.display = 'block';
                
                // Store in localStorage to persist the submission
                localStorage.setItem('finflow_waitlist', JSON.stringify({
                    submitted: true,
                    data: formData,
                    timestamp: new Date().toISOString()
                }));
                
                // Reset button state (in case they go back)
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Check if user has already submitted the form
    const waitlistData = localStorage.getItem('finflow_waitlist');
    if (waitlistData && waitlistForm && waitlistSuccess) {
        const parsedData = JSON.parse(waitlistData);
        if (parsedData.submitted) {
            waitlistForm.style.display = 'none';
            waitlistSuccess.style.display = 'block';
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20, // Offset for header plus some padding
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    mobileMenuBtn.click();
                }
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Add CSS for mobile menu when JavaScript is enabled
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.active, .cta-buttons.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background-color: var(--background-color);
                padding: 20px;
                box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                animation: slideDown 0.3s ease forwards;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .nav-links.active {
                gap: 20px;
            }
            
            .cta-buttons.active {
                top: calc(80px + 200px);
                align-items: center;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .pricing-card, .step, .testimonial, .section-header, .integration-logo, .faq-item, .waitlist-form, .waitlist-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add CSS for scroll animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature-card, .pricing-card, .step, .testimonial, .section-header, .integration-logo, .faq-item, .waitlist-form, .waitlist-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .feature-card.animate, .pricing-card.animate, .step.animate, .testimonial.animate, .section-header.animate, .integration-logo.animate, .faq-item.animate, .waitlist-form.animate, .waitlist-image.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .testimonial {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .testimonial.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animation for feature cards */
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        .feature-card:nth-child(5) { transition-delay: 0.5s; }
        .feature-card:nth-child(6) { transition-delay: 0.6s; }
        
        /* Staggered animation for pricing cards */
        .pricing-card:nth-child(1) { transition-delay: 0.1s; }
        .pricing-card:nth-child(2) { transition-delay: 0.2s; }
        .pricing-card:nth-child(3) { transition-delay: 0.3s; }
        
        /* Staggered animation for integration logos */
        .integration-logo:nth-child(1) { transition-delay: 0.1s; }
        .integration-logo:nth-child(2) { transition-delay: 0.2s; }
        .integration-logo:nth-child(3) { transition-delay: 0.3s; }
        .integration-logo:nth-child(4) { transition-delay: 0.4s; }
        .integration-logo:nth-child(5) { transition-delay: 0.5s; }
        .integration-logo:nth-child(6) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(animationStyle);
    
    // Run animation on page load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Intersection Observer for more efficient animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);
        
        const elementsToAnimate = document.querySelectorAll('.feature-card, .pricing-card, .step, .section-header, .integration-logo, .faq-item, .waitlist-form, .waitlist-image');
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Floating labels for form inputs
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        // Check if input has a value on load
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Add event listeners for focus and blur
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
        
        // For handling autofill
        input.addEventListener('change', () => {
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            }
        });
    });
    
    // Add current year to copyright
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2023', currentYear);
    }
    
    // Handle back to top button
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.style.display = 'none';
        document.body.appendChild(button);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    createBackToTopButton();
    
    // Add CSS for back to top button
    const backToTopStyle = document.createElement('style');
    backToTopStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            z-index: 99;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            transition: all 0.3s ease;
            opacity: 0.8;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            opacity: 1;
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                width: 40px;
                height: 40px;
                bottom: 20px;
                right: 20px;
                font-size: 16px;
            }
        }
    `;
    document.head.appendChild(backToTopStyle);
}); 