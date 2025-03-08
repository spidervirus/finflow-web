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
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial
        if (testimonials[index]) {
            testimonials[index].style.display = 'block';
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
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
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
                companySize: document.getElementById('company-size').value
            };
            
            // In a real application, you would send this data to your server
            // For this example, we'll just simulate a successful submission
            console.log('Waitlist submission:', formData);
            
            // Show success message
            waitlistForm.style.display = 'none';
            waitlistSuccess.style.display = 'block';
            
            // Store in localStorage to persist the submission
            localStorage.setItem('finflow_waitlist', JSON.stringify({
                submitted: true,
                data: formData,
                timestamp: new Date().toISOString()
            }));
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
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    mobileMenuBtn.click();
                }
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
        const elements = document.querySelectorAll('.feature-card, .pricing-card, .step, .testimonial');
        
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
        .feature-card, .pricing-card, .step, .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .pricing-card.animate, .step.animate, .testimonial.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Run animation on page load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
}); 