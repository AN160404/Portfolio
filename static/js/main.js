// Main JavaScript for Atia Naim Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initProjectCards();
    initSmoothScrolling();
    initAnimations();
    initContactForm();
    initCertificationModal();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Handle navbar background on scroll (only if navbar exists)
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active nav link
            updateActiveNavLink();
        });
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Mobile nav toggle
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');

    if (navToggler) {
        navToggler.addEventListener('click', function() {
            setTimeout(() => {
                if (navCollapse.classList.contains('show')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            }, 300);
        });
    }

    // Close mobile nav when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const bsCollapse = new bootstrap.Collapse(navCollapse, {
                    hide: true
                });
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Project cards functionality
function initProjectCards() {
    const toggleButtons = document.querySelectorAll('.toggle-details');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const details = projectCard.querySelector('.project-details');
            const isVisible = details.style.display !== 'none';

            if (isVisible) {
                details.style.display = 'none';
                this.textContent = 'View Details';
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline-primary');
            } else {
                details.style.display = 'block';
                details.classList.add('show');
                this.textContent = 'Hide Details';
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .project-card, .skill-category, .achievement-card, .publication-card, .cert-card'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item,
        .project-card,
        .skill-category,
        .achievement-card,
        .publication-card,
        .cert-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }

        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitButton.disabled = true;
            
            // Form will be submitted normally, but we add visual feedback
            setTimeout(() => {
                if (!window.location.hash.includes('contact')) {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }
            }, 2000);
        });

        // Real-time form validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }
}

// Field validation function
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Remove existing validation classes and messages
    field.classList.remove('is-valid', 'is-invalid');
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }

    // Validate based on field type
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        
        case 'subject':
            if (value.length < 5) {
                isValid = false;
                errorMessage = 'Subject must be at least 5 characters long';
            }
            break;
        
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }

    // Apply validation styling
    if (value && isValid) {
        field.classList.add('is-valid');
    } else if (value && !isValid) {
        field.classList.add('is-invalid');
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }

    return isValid;
}

// Utility function for debouncing
function debounce(func, wait) {
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Reset mobile nav on resize
    if (window.innerWidth >= 992) {
        document.body.style.overflow = 'auto';
        const navCollapse = document.querySelector('.navbar-collapse');
        if (navCollapse && navCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navCollapse, {
                hide: true
            });
        }
    }
}, 250));

// Typing animation for hero tagline
function initTypingAnimation() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;

    const text = tagline.textContent;
    tagline.textContent = '';
    
    let index = 0;
    const typeSpeed = 50;
    
    function typeCharacter() {
        if (index < text.length) {
            tagline.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, typeSpeed);
        }
    }
    
    // Start typing animation after hero loads
    setTimeout(typeCharacter, 1000);
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    initTypingAnimation();
});

// Preloader (optional)
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Loading Portfolio...</p>
        </div>
    `;
    
    const preloaderStyles = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
        }
        
        .preloader.fade-out {
            opacity: 0;
            pointer-events: none;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = preloaderStyles;
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
}

// Initialize preloader
// initPreloader();

// Add some Easter eggs
function initEasterEggs() {
    let konami = [];
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', function(e) {
        konami.push(e.keyCode);
        if (konami.length > konamiCode.length) {
            konami.shift();
        }
        
        if (konami.join('') === konamiCode.join('')) {
            // Easter egg: Add rainbow effect to page
            document.body.style.animation = 'rainbow 2s infinite';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 5000);
            
            konami = [];
        }
    });
}

initEasterEggs();

// Certification Modal functionality
function initCertificationModal() {
    const certCards = document.querySelectorAll('.cert-card[data-cert]');
    const modal = document.getElementById('certModal');
    const closeBtn = document.querySelector('.cert-modal-close');
    
    if (!modal) return;

    // Certification data
    const certData = {
        'oracle-gen-ai': {
            title: 'Oracle Cloud Infrastructure Generative AI Professional',
            date: 'August 2025',
            icon: 'fas fa-cloud',
            description: 'Advanced certification demonstrating expertise in Oracle Cloud\'s Generative AI services, including large language models, prompt engineering, and AI application development.',
            skills: ['Generative AI', 'Oracle Cloud', 'LLMs', 'Prompt Engineering', 'AI Services', 'Cloud Computing'],
            credentials: {
                'Certification ID': 'OCI-GAI-PRO-2025',
                'Valid Until': 'August 2027',
                'Issued By': 'Oracle Corporation',
                'Level': 'Professional'
            }
        },
        'oracle-ai-foundation': {
            title: 'Oracle Cloud Infrastructure AI Foundation Associate',
            date: 'August 2025',
            icon: 'fas fa-robot',
            description: 'Foundational certification covering Oracle Cloud AI services, machine learning fundamentals, and AI infrastructure deployment.',
            skills: ['Oracle Cloud', 'AI Foundations', 'Machine Learning', 'Cloud Infrastructure', 'Data Science'],
            credentials: {
                'Certification ID': 'OCI-AIF-ASC-2025',
                'Valid Until': 'August 2027',
                'Issued By': 'Oracle Corporation',
                'Level': 'Associate'
            }
        },
        'mongodb': {
            title: 'MongoDB Database Administration',
            date: 'January 2025',
            icon: 'fas fa-database',
            description: 'Comprehensive certification in MongoDB database administration, covering database design, performance optimization, and advanced querying techniques.',
            skills: ['MongoDB', 'NoSQL', 'Database Design', 'Performance Tuning', 'Data Modeling', 'Aggregation'],
            credentials: {
                'Platform': 'Coursera',
                'Completion Date': 'January 2025',
                'Issued By': 'MongoDB University',
                'Course Hours': '40+ Hours'
            }
        },
        'nptel-design': {
            title: 'NPTEL Software Conceptual Design',
            date: 'November 2024',
            icon: 'fas fa-medal',
            description: 'Gold Badge certification in software conceptual design, covering advanced design patterns, system architecture, and software engineering principles.',
            skills: ['Software Design', 'Design Patterns', 'System Architecture', 'UML', 'Software Engineering'],
            credentials: {
                'Badge': 'Gold',
                'Score': '85%+',
                'Issued By': 'NPTEL (IIT/IISc)',
                'Course Duration': '12 Weeks'
            }
        },
        'nptel-python': {
            title: 'NPTEL Python for Data Science',
            date: 'April 2024',
            icon: 'fas fa-python',
            description: 'Comprehensive certification in Python programming for data science applications, including data analysis, visualization, and machine learning fundamentals.',
            skills: ['Python', 'Data Science', 'Data Analysis', 'Data Visualization', 'Pandas', 'NumPy', 'Matplotlib'],
            credentials: {
                'Completion Date': 'April 2024',
                'Issued By': 'NPTEL (IIT/IISc)',
                'Course Duration': '12 Weeks',
                'Final Score': 'Distinction'
            }
        }
    };

    // Add click event listeners to certification cards
    certCards.forEach(card => {
        card.addEventListener('click', function() {
            const certId = this.getAttribute('data-cert');
            const data = certData[certId];
            
            if (data) {
                showCertModal(data);
            }
        });
    });

    // Close modal events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCertModal);
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCertModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeCertModal();
        }
    });

    function showCertModal(data) {
        // Populate modal content
        document.getElementById('modalIcon').className = data.icon;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalSubtitle').textContent = data.title;
        document.getElementById('modalDate').textContent = `Completed: ${data.date}`;
        
        // Description
        const descDiv = document.getElementById('modalDescription');
        descDiv.innerHTML = `<div class="cert-description"><p>${data.description}</p></div>`;
        
        // Skills
        const skillsDiv = document.getElementById('modalSkills');
        const skillsHTML = data.skills.map(skill => 
            `<span class="cert-skill-tag">${skill}</span>`
        ).join('');
        skillsDiv.innerHTML = `
            <div class="cert-skills">
                <h5>Skills & Technologies</h5>
                ${skillsHTML}
            </div>
        `;
        
        // Credentials
        const credDiv = document.getElementById('modalCredentials');
        const credHTML = Object.entries(data.credentials).map(([key, value]) =>
            `<div class="credential-item">
                <span class="credential-label">${key}:</span>
                <span class="credential-value">${value}</span>
            </div>`
        ).join('');
        credDiv.innerHTML = `
            <div class="cert-credentials">
                <h5>Certification Details</h5>
                ${credHTML}
            </div>
        `;
        
        // Show modal with animation
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    function closeCertModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 400);
    }
}

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initProjectCards,
        initSmoothScrolling,
        initAnimations,
        initContactForm,
        validateField
    };
}
