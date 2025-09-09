// Enhanced Navigation with Smooth Animations
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item.dropdown');
    const dropdowns = document.querySelectorAll('.dropdown-content');
    let activeDropdown = null;
    let hoverTimeout = null;

    // Enhanced hover effects for dropdowns with lazy loading
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-content');
        const arrow = item.querySelector('.dropdown-arrow');
        const contentType = dropdown.getAttribute('data-content');
        
        item.addEventListener('mouseenter', function() {
            // Clear any existing timeout
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
            
            // Close other dropdowns with animation
            if (activeDropdown && activeDropdown !== dropdown) {
                closeDropdown(activeDropdown);
            }
            
            // Load content if not already loaded
            if (!dropdown.classList.contains('loaded')) {
                loadDropdownContent(dropdown, contentType);
            }
            
            // Open current dropdown
            openDropdown(dropdown, arrow);
            activeDropdown = dropdown;
        });
        
        item.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                closeDropdown(dropdown, arrow);
                if (activeDropdown === dropdown) {
                    activeDropdown = null;
                }
            }, 150); // Small delay to prevent flickering
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.dropdown')) {
            closeAllDropdowns();
        }
    });

    // Close dropdowns on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });

    // Smooth scroll for anchor links
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

    // Add loading animation to page
    addLoadingAnimation();
    
    // Add scroll-based navbar effects
    addScrollEffects();
    
    // Add theme toggle functionality
    addThemeToggle();
    
    // Add hero section animations
    addHeroAnimations();
    
    // Add mobile menu functionality
    addMobileMenuToggle();
});

function openDropdown(dropdown, arrow) {
    if (!dropdown) return;
    
    // Add active class for additional styling
    dropdown.parentElement.classList.add('active');
    
    // Animate arrow rotation
    if (arrow) {
        arrow.style.transform = 'rotate(180deg)';
    }
    
    // Show dropdown with animation
    dropdown.style.display = 'flex';
    dropdown.style.opacity = '0';
    dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
    
    // Force reflow
    dropdown.offsetHeight;
    
    // Animate in
    dropdown.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    dropdown.style.opacity = '1';
    dropdown.style.visibility = 'visible';
    dropdown.style.transform = 'translateX(-50%) translateY(0)';
    
    // Only animate if content is already loaded
    if (dropdown.classList.contains('loaded')) {
        initializeDropdownAnimations(dropdown);
    }
}

function closeDropdown(dropdown, arrow) {
    if (!dropdown) return;
    
    // Remove active class
    dropdown.parentElement.classList.remove('active');
    
    // Animate arrow back
    if (arrow) {
        arrow.style.transform = 'rotate(0deg)';
    }
    
    // Animate out
    dropdown.style.transition = 'all 0.2s ease';
    dropdown.style.opacity = '0';
    dropdown.style.visibility = 'hidden';
    dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
    
    // Hide after animation
    setTimeout(() => {
        dropdown.style.display = 'none';
    }, 200);
}

function closeAllDropdowns() {
    const activeDropdowns = document.querySelectorAll('.dropdown-content[style*="opacity: 1"]');
    activeDropdowns.forEach(dropdown => {
        const arrow = dropdown.parentElement.querySelector('.dropdown-arrow');
        closeDropdown(dropdown, arrow);
    });
}

function addLoadingAnimation() {
    // Add a subtle loading effect to the page
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.body.style.transition = 'all 0.6s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
}

function addScrollEffects() {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Add CSS for scroll effects
const scrollStyles = `
    .navbar {
        transition: transform 0.3s ease;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
    }
    
    .nav-link {
        position: relative;
        overflow: hidden;
    }
    
    .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: #1a1a1a;
        transition: width 0.3s ease;
    }
    
    .nav-item:hover .nav-link::after {
        width: 100%;
    }
`;

// Inject scroll styles
const styleSheet = document.createElement('style');
styleSheet.textContent = scrollStyles;
document.head.appendChild(styleSheet);

function addThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add rotation animation
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

function addHeroAnimations() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        // Add entrance animation
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(30px)';
        heroSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 300);
    }
}

function addMobileMenuToggle() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Lazy loading content definitions
const dropdownContent = {
    services: `
        <div class="dropdown-left">
            <a href="#" class="dropdown-link">Design</a>
            <a href="#" class="dropdown-link">Technology</a>
            <a href="#" class="dropdown-link">Marketing</a>
        </div>
        <div class="dropdown-right">
            <div class="feature-card">
                <h3>Design Services</h3>
                <p>Handcraft the user experience.</p>
                <div class="card-bg pattern-1"></div>
            </div>
            <div class="feature-card">
                <h3>Technology</h3>
                <p>Leverage the power of code.</p>
                <div class="card-bg pattern-2"></div>
            </div>
            <div class="feature-card">
                <h3>Marketing</h3>
                <p>Creative strategies for brands.</p>
                <div class="card-bg pattern-3"></div>
            </div>
        </div>
    `,
    about: `
        <div class="dropdown-left">
            <a href="#" class="dropdown-link">About Us</a>
            <a href="#" class="dropdown-link">Our Team</a>
            <a href="#" class="dropdown-link">Careers</a>
        </div>
        <div class="dropdown-right">
            <div class="feature-card">
                <h3>Our Story</h3>
                <div class="card-bg pattern-1"></div>
            </div>
            <div class="feature-card">
                <h3>Join Our Team</h3>
                <p>Join our team and help us build the future.</p>
                <div class="card-bg pattern-2"></div>
            </div>
        </div>
    `
};

function loadDropdownContent(dropdown, contentType) {
    // Load content instantly
    if (dropdownContent[contentType]) {
        dropdown.innerHTML = dropdownContent[contentType];
        dropdown.classList.add('loaded');
        
        // Initialize animations for the loaded content
        initializeDropdownAnimations(dropdown);
    } else {
        dropdown.innerHTML = `
            <div class="loading-spinner">
                <p>Content not available</p>
            </div>
        `;
    }
}

function initializeDropdownAnimations(dropdown) {
    // Animate dropdown links
    const links = dropdown.querySelectorAll('.dropdown-link');
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, index * 80);
    });
    
    // Animate feature cards
    const cards = dropdown.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 150 + index * 120);
    });
}
