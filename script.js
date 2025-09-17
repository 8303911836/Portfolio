// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image');

    if (heroTitle) {
        heroTitle.classList.add('slide-in-left');
        observer.observe(heroTitle);
    }
    if (heroSubtitle) {
        heroSubtitle.classList.add('slide-in-left');
        observer.observe(heroSubtitle);
    }
    if (heroTagline) {
        heroTagline.classList.add('slide-in-left');
        observer.observe(heroTagline);
    }
    if (heroButtons) {
        heroButtons.classList.add('slide-in-left');
        observer.observe(heroButtons);
    }
    if (heroImage) {
        heroImage.classList.add('slide-in-right');
        observer.observe(heroImage);
    }

    // About section animations
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');

    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
    }
    if (aboutImage) {
        aboutImage.classList.add('slide-in-right');
        observer.observe(aboutImage);
    }

    // Section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });
});

// Parallax effect for hero background orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing animation for hero title
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

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Extract just the name part for typing effect
        const nameMatch = originalText.match(/<span class="gradient-text">(.*?)<\/span>/);
        if (nameMatch) {
            const name = nameMatch[1];
            const beforeName = originalText.split('<span class="gradient-text">')[0];
            const afterName = originalText.split('</span>')[1];
            
            heroTitle.innerHTML = beforeName + '<span class="gradient-text"></span>' + afterName;
            const nameSpan = heroTitle.querySelector('.gradient-text');
            
            setTimeout(() => {
                typeWriter(nameSpan, name, 150);
            }, 1000);
        }
    }
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.1)';
    this.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Add some interactive effects to the profile image
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) contrast(1.1)';
    });
    
    profileImage.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1) contrast(1)';
    });
}

// Education section progress bar animation
function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const width = progressFill.getAttribute('data-width');
        setTimeout(() => {
            progressFill.style.width = width + '%';
        }, 500);
    }
}

// Animate progress bar when education section comes into view
const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBar();
            educationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const educationSection = document.querySelector('.education');
if (educationSection) {
    educationObserver.observe(educationSection);
}

// Add hover effects to education stats
document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to learning cards
document.querySelectorAll('.learning-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateY(-5px) scale(1)';
        }, 150);
    });
});

// Elegant Scroll-based Animations

// Enhanced scroll observer for better performance - Continuous animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.stagger-1, .stagger-2, .stagger-3, .stagger-4, .stagger-5');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('visible');
                }, index * 100);
            });
        } else {
            // Reset animation when element goes out of view
            entry.target.classList.remove('visible');
            const children = entry.target.querySelectorAll('.stagger-1, .stagger-2, .stagger-3, .stagger-4, .stagger-5');
            children.forEach(child => {
                child.classList.remove('visible');
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply scroll animations to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation classes to elements
    const elementsToAnimate = [
        { selector: '.hero-text', animation: 'slide-in-left' },
        { selector: '.hero-image', animation: 'slide-in-right' },
        { selector: '.about-text', animation: 'scroll-slide-left' },
        { selector: '.about-image', animation: 'scroll-slide-right' },
        { selector: '.skill-category', animation: 'scroll-fade' },
        { selector: '.experience-card', animation: 'scroll-scale' },
        { selector: '.cert-card', animation: 'scroll-scale' },
        { selector: '.project-card', animation: 'scroll-scale' },
        { selector: '.education-card', animation: 'scroll-fade' },
        { selector: '.learning-card', animation: 'scroll-scale' },
        { selector: '.contact-item', animation: 'scroll-slide-left' },
        { selector: '.contact-form', animation: 'scroll-slide-right' }
    ];

    elementsToAnimate.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add(animation);
            if (index > 0) {
                element.classList.add(`stagger-${Math.min(index, 5)}`);
            }
            scrollObserver.observe(element);
        });
    });

    // Add special animations to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.classList.add('scroll-fade');
        item.classList.add(`stagger-${(index % 5) + 1}`);
        scrollObserver.observe(item);
    });
});

// Smooth parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// 18 Floating Shapes Cursor Following Animation - Optimized
let mouseX = 0;
let mouseY = 0;
let shapePositions = [];
let animationRunning = false;

// Initialize shape positions
for (let i = 1; i <= 18; i++) {
    shapePositions.push({ x: 0, y: 0 });
}

// Smooth following animation for all shapes - Optimized
function animateShapes() {
    if (!animationRunning) return;
    
    const speed = 0.08;
    
    for (let i = 1; i <= 18; i++) {
        const shape = document.getElementById(`shape${i}`);
        if (shape) {
            // Different follow patterns for each shape
            let followX, followY, rotationSpeed, scale;
            
            switch(i) {
                case 1: // Cube - follows closely
                    followX = mouseX * 0.8;
                    followY = mouseY * 0.8;
                    rotationSpeed = 0.15;
                    scale = 1.1;
                    break;
                case 2: // Circle - follows with delay
                    followX = mouseX * 0.4;
                    followY = mouseY * 0.4;
                    rotationSpeed = 0.1;
                    scale = 0.9;
                    break;
                case 3: // Triangle - opposite movement
                    followX = -mouseX * 0.3;
                    followY = -mouseY * 0.3;
                    rotationSpeed = 0.12;
                    scale = 1.0;
                    break;
                case 4: // Diamond - follows with rotation
                    followX = mouseX * 0.6;
                    followY = mouseY * 0.6;
                    rotationSpeed = 0.2;
                    scale = 1.05;
                    break;
                case 5: // Hexagon - slow follow
                    followX = mouseX * 0.2;
                    followY = mouseY * 0.2;
                    rotationSpeed = 0.08;
                    scale = 0.95;
                    break;
                case 6: // Star - fast follow
                    followX = mouseX * 0.9;
                    followY = mouseY * 0.9;
                    rotationSpeed = 0.18;
                    scale = 1.15;
                    break;
                case 7: // Pentagon - medium follow
                    followX = mouseX * 0.5;
                    followY = mouseY * 0.5;
                    rotationSpeed = 0.11;
                    scale = 1.0;
                    break;
                case 8: // Octagon - circular movement
                    followX = mouseX * 0.7;
                    followY = mouseY * 0.7;
                    rotationSpeed = 0.16;
                    scale = 1.08;
                    break;
                case 9: // Heart - gentle follow
                    followX = mouseX * 0.35;
                    followY = mouseY * 0.35;
                    rotationSpeed = 0.09;
                    scale = 0.92;
                    break;
                case 10: // Arrow - direct follow
                    followX = mouseX * 0.85;
                    followY = mouseY * 0.85;
                    rotationSpeed = 0.14;
                    scale = 1.12;
                    break;
                case 11: // Cross - slow rotation
                    followX = mouseX * 0.25;
                    followY = mouseY * 0.25;
                    rotationSpeed = 0.06;
                    scale = 0.88;
                    break;
                case 12: // Plus - fast rotation
                    followX = mouseX * 0.45;
                    followY = mouseY * 0.45;
                    rotationSpeed = 0.22;
                    scale = 1.06;
                    break;
                case 13: // Rounded square - medium follow
                    followX = mouseX * 0.55;
                    followY = mouseY * 0.55;
                    rotationSpeed = 0.13;
                    scale = 1.03;
                    break;
                case 14: // Oval - wide movement
                    followX = mouseX * 0.65;
                    followY = mouseY * 0.65;
                    rotationSpeed = 0.17;
                    scale = 1.09;
                    break;
                case 15: // Rectangle - narrow movement
                    followX = mouseX * 0.75;
                    followY = mouseY * 0.75;
                    rotationSpeed = 0.19;
                    scale = 1.07;
                    break;
                case 16: // Small circle - quick follow
                    followX = mouseX * 0.95;
                    followY = mouseY * 0.95;
                    rotationSpeed = 0.25;
                    scale = 1.2;
                    break;
                case 17: // Large square - slow follow
                    followX = mouseX * 0.15;
                    followY = mouseY * 0.15;
                    rotationSpeed = 0.05;
                    scale = 0.85;
                    break;
                case 18: // Small triangle - erratic movement
                    followX = -mouseX * 0.4;
                    followY = -mouseY * 0.4;
                    rotationSpeed = 0.21;
                    scale = 1.1;
                    break;
            }
            
            // Smooth interpolation
            shapePositions[i-1].x += (followX - shapePositions[i-1].x) * speed;
            shapePositions[i-1].y += (followY - shapePositions[i-1].y) * speed;
            
            // Apply transformations
            const rotateX = (mouseY - shapePositions[i-1].y) * rotationSpeed;
            const rotateY = (mouseX - shapePositions[i-1].x) * rotationSpeed;
            const rotateZ = (mouseX + mouseY) * 0.1;
            
            shape.style.transform = `translate(${shapePositions[i-1].x}px, ${shapePositions[i-1].y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
        }
    }
    
    requestAnimationFrame(animateShapes);
}

// Start animation only when page is ready
function startShapeAnimation() {
    animationRunning = true;
    animateShapes();
}

// Stop animation when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        animationRunning = false;
    } else {
        animationRunning = true;
        animateShapes();
    }
});

// Mouse movement tracking
document.addEventListener('mousemove', (e) => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate relative mouse position from center
        mouseX = (e.clientX - centerX) * 0.6;
        mouseY = (e.clientY - centerY) * 0.6;
    }
});

// Start the animation loop when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        startShapeAnimation();
    }, 1000);
    
    // Initialize form handling
    initializeFormHandling();
});

// Add hover effects to all shapes
document.addEventListener('DOMContentLoaded', () => {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        shape.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.3)';
            this.style.filter = 'brightness(1.3)';
            this.style.zIndex = '10';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.3)', '');
            this.style.filter = 'brightness(1)';
            this.style.zIndex = '2';
        });
        
        // Add click effect
        shape.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform += ' scale(1.5) rotate(360deg)';
            setTimeout(() => {
                this.style.animation = '';
                this.style.transform = this.style.transform.replace(' scale(1.5) rotate(360deg)', '');
            }, 500);
        });
    });
});

// ==================== FORM HANDLING SYSTEM ====================

// Array to store form submissions
let formSubmissions = [];

// Initialize form handling
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString(),
        id: Date.now() + Math.random()
    };
    
    // Validate form
    if (validateForm(formObject)) {
        // Store form data
        formSubmissions.push(formObject);
        
        // Save to localStorage for persistence
        localStorage.setItem('portfolioFormSubmissions', JSON.stringify(formSubmissions));

        // Send to Google Apps Script endpoint (Google Sheet)
        sendToGoogleSheet(formObject)
            .then(() => {
                // Show success message
                showFormMessage('success', 'Thank you! Your message has been sent successfully.');

                // Reset form
                e.target.reset();

                // Log to console for development
                console.log('New form submission:', formObject);
                console.log('All submissions:', formSubmissions);
            })
            .catch((error) => {
                console.error('Error sending to Google Sheet:', error);
                showFormMessage('error', 'Submitted locally. Remote save failed. Please try again later.');
            });
        
    } else {
        showFormMessage('error', 'Please fill in all fields correctly.');
    }
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (field.name === 'name' && value && value.length < 2) {
        showFieldError(field, 'Name must be at least 2 characters long');
        return false;
    }
    
    if (field.name === 'message' && value && value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters long');
        return false;
    }
    
    return true;
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

// Validate entire form
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors.length === 0;
}

// Show form message
function showFormMessage(type, message) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' 
            ? 'background: linear-gradient(135deg, #10b981, #059669); color: white;' 
            : 'background: linear-gradient(135deg, #ef4444, #dc2626); color: white;'
        }
    `;
    
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(messageElement, form);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
    }, 5000);
}

// Load stored submissions on page load
function loadStoredSubmissions() {
    const stored = localStorage.getItem('portfolioFormSubmissions');
    if (stored) {
        try {
            formSubmissions = JSON.parse(stored);
            console.log('Loaded stored submissions:', formSubmissions);
        } catch (e) {
            console.error('Error loading stored submissions:', e);
        }
    }
}



// Load submissions when page loads
loadStoredSubmissions();

// Add CSS for form validation
const formStyles = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;

// Inject form styles
const styleSheet = document.createElement('style');
styleSheet.textContent = formStyles;
document.head.appendChild(styleSheet);

// Google Apps Script integration
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxN35gLSYhEUrJ3-uS5jpwzRFSEYycdJ2y3XmiHeRICbMpi2XMbheZ06qct0VjZUQCx/exec';

function sendToGoogleSheet(data) {
    // Use URL-encoded form data to avoid complex CORS preflights
    const body = new URLSearchParams({
        name: data.name,
        email: data.email,
        message: data.message,
        timestamp: data.timestamp,
    });

    // Use no-cors so the request succeeds without reading response
    return fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body
    });
}


// View all form submissions
function viewSubmissions() {
    const submissionsList = document.getElementById('submissions-list');
    const submissions = getAllSubmissions();
    
    if (submissions.length === 0) {
        submissionsList.innerHTML = '<p style="text-align: center; color: #9ca3af; padding: 2rem;">No form submissions yet.</p>';
        return;
    }
    
    let html = `<div style="display: grid; gap: 1rem;">`;
    
    submissions.forEach((submission, index) => {
        const date = new Date(submission.timestamp).toLocaleString();
        html += `
            <div style="background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #6366f1;">
                <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                    <h4 style="color: #6366f1; margin: 0; flex: 1; min-width: 200px;">${submission.name}</h4>
                    <span style="color: #9ca3af; font-size: 0.875rem;">${date}</span>
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #e5e7eb;">Email:</strong>
                    <span style="color: #d1d5db; margin-left: 0.5rem;">${submission.email}</span>
                </div>
                <div>
                    <strong style="color: #e5e7eb;">Message:</strong>
                    <p style="color: #d1d5db; margin: 0.5rem 0 0 0; line-height: 1.5;">${submission.message}</p>
                </div>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <small style="color: #9ca3af;">ID: ${submission.id}</small>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    submissionsList.innerHTML = html;
}

// Export submissions as JSON (for backup)
function exportSubmissions() {
    const submissions = getAllSubmissions();
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `form-submissions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Creative hover effects
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
        this.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 15px rgba(99, 102, 241, 0.2)';
    });
});

// Project card 3D tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Smooth reveal animation for progress bar - Continuous
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            if (progressFill) {
                const width = progressFill.getAttribute('data-width');
                setTimeout(() => {
                    progressFill.style.width = width + '%';
                }, 500);
            }
        } else {
            // Reset progress bar when out of view
            const progressFill = entry.target.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = '0%';
            }
        }
    });
}, { threshold: 0.5 });

const progressBar = document.querySelector('.progress-container');
if (progressBar) {
    progressObserver.observe(progressBar);
}

// Simple and reliable typing effect for hero title
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

// Initialize typing animation - Continuous approach
let typingAnimationStarted = false;

function startTypingAnimation() {
    if (typingAnimationStarted) return;
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Set the title with your name
        heroTitle.innerHTML = 'Hi, I\'m <span class="gradient-text"></span>';
        const nameSpan = heroTitle.querySelector('.gradient-text');
        
        if (nameSpan) {
            typingAnimationStarted = true;
            // Start typing animation
            setTimeout(() => {
                typeWriter(nameSpan, 'Diwakar Mehndiratta', 100);
            }, 1000);
        }
    }
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(startTypingAnimation, 500);
});

// Restart typing animation when scrolling back to hero section
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Reset and restart typing animation
            typingAnimationStarted = false;
            setTimeout(startTypingAnimation, 200);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Experience: certificate modal open/close with animation
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;
    
    // Intercept experience certificate view button
    document.querySelectorAll('.exp-view').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (modal && modalImg && href) {
                modalImg.src = href;
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            } else {
                window.open(href, '_blank');
            }
        });
    });

    const hideModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (modalImg) modalImg.src = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', hideModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('image-modal-backdrop')) hideModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) hideModal();
        });
    }
});
