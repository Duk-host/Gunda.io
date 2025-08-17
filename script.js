// Enhanced JavaScript for Gunda Website with Modern Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('is-open');
            navToggle.classList.toggle('is-active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('is-open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('is-open');
                navToggle.classList.remove('is-active');
                body.style.overflow = '';
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced Header Scroll Effect
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('stats-grid') || entry.target.classList.contains('projects-grid')) {
                    const items = entry.target.querySelectorAll('.stat-item, .project-card');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero-content, .stats-card, .projects-grid, .section-title');
    animateElements.forEach(el => observer.observe(el));

    // Enhanced Button Interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Enhanced Card Hover Effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Loading Animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Hide loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
        
        // Animate hero content on load
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease-out';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    });

    // Show loading overlay immediately
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }

    // Enhanced Form Interactions
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Floating Action Button
    const fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML = '<i class="fas fa-arrow-up"></i>';
    fab.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(fab);

    // Show/hide FAB based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            fab.style.opacity = '1';
            fab.style.visibility = 'visible';
        } else {
            fab.style.opacity = '0';
            fab.style.visibility = 'hidden';
        }
    });

    // Enhanced Image Loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Add loading state
        if (!img.complete) {
            img.classList.add('loading');
        }
    });

    // Performance Optimization: Debounced scroll handler
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

    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Handle scroll-based animations here
    }, 16); // ~60fps

    window.addEventListener('scroll', debouncedScrollHandler);

    // Enhanced Accessibility
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
            navMenu.classList.remove('is-open');
            navToggle.classList.remove('is-active');
            body.style.overflow = '';
        }
    });

    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.classList.add('keyboard-focus');
        });
        
        el.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
    });

    console.log('🚀 Gunda Website Enhanced with Modern UI Framework!');
});


