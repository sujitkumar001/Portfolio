// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Mobile Navigation
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

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Social Sidebar Visibility Control
function updateSocialSidebarVisibility() {
    const heroSection = document.getElementById('home');
    const heroRect = heroSection.getBoundingClientRect();
    const isHeroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
    
    if (isHeroVisible) {
        document.body.classList.add('hero-active');
    } else {
        document.body.classList.remove('hero-active');
    }
}

// Update social sidebar visibility on scroll
window.addEventListener('scroll', updateSocialSidebarVisibility);
window.addEventListener('load', updateSocialSidebarVisibility);

// Smooth Scrolling for Navigation Links
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

// Rotating Job Titles Animation
const titles = [
    'Full Stack Developer',
    'Data Analyst', 
    'AI Enthusiast',
    'ML Engineer'
];

let currentTitleIndex = 0;
const rotatingTitle = document.getElementById('rotating-title');

function rotateTitle() {
    rotatingTitle.style.opacity = '0';
    rotatingTitle.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        rotatingTitle.textContent = titles[currentTitleIndex];
        rotatingTitle.style.opacity = '1';
        rotatingTitle.style.transform = 'translateY(0)';
    }, 300);
}

// Start rotating titles after initial load
setTimeout(() => {
    setInterval(rotateTitle, 3000);
}, 2000);

// Intersection Observer for Animations
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

// Observe all animated elements
document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up, .slide-in-left, .slide-in-right, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Resume Download
document.getElementById('resume-btn').addEventListener('click', () => {
    // Create a dummy PDF download
    const link = document.createElement('a');
    link.href = 'updatedResume.pdf';
    link.download = 'updatedResume.pdf';
    link.click();
    
    // Show success message
    showNotification('Resume downloaded successfully!', 'success');
});

// Project Modal Functionality
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

const projectData = {
    1: {
    title: 'AI Interview Mocker',
    description: 'An intelligent mock interview platform built with React, TypeScript, and shadcn/ui for a clean and modern UI. Integrated Vapi for real-time voice-based AI interviews and Firebase for authentication and data storage. The platform simulates realistic interview experiences, tracks user performance, and helps users prepare confidently for job interviews.',
    image: 'projects_img/project1.png',
    technologies: ['React', 'TypeScript', 'shadcn/ui', 'Vapi', 'Firebase', 'OpenAI API'],
    features: [
        'Voice-based AI mock interviews powered by Vapi',
        'Real-time question-answer interaction',
        'Performance tracking and feedback summary',
        'User authentication and secure data storage with Firebase',
        'Modern and responsive UI built with shadcn/ui',
        'Role-specific interview scenarios',
        'Progress tracking across sessions'
    ],
    github: 'https://github.com/sujitkumar001/AI_Interview_Platform',
    demo: 'https://ai-interview-platform-taupe.vercel.app/'
},
    2: {
    title: 'Academic Grade Calculator',
    description: 'A web-based application designed to help students easily calculate their academic grades based on various assessment criteria. Built using HTML, CSS, and JavaScript, this tool provides a user-friendly interface for inputting grades and calculating overall performance, making it an essential resource for students aiming to track their academic progress.',
    image: 'projects_img/project2.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: [
        'Simple and intuitive grade input system',
        'Instant overall grade calculation',
        'Support for multiple subjects and criteria',
        'Responsive and mobile-friendly design',
        'Real-time updates without page reloads',
        'Helpful for students to track academic performance'
    ],
    github: 'https://github.com/sujitkumar001/Academic_Grade_Calculator',
    demo: 'https://academic-grade-calculator.vercel.app/'
}
,
    3: {
    title: 'PPE Detection for Steel Plant',
    description: 'A real-time PPE (Personal Protective Equipment) Detection System built using Machine Learning and Computer Vision to monitor worker safety in steel plant environments. Detects safety gear like helmets, vests, and shoes via webcam, logs violations with timestamps, and displays them on an interactive dashboard.',
    image: 'projects_img/project3.png',
    technologies: ['Python', 'YOLOv8', 'OpenCV', 'Streamlit', 'Pandas', 'CSV Logging'],
    features: [
        'Real-time object detection via webcam',
        'Detection of hard hats, vests, and safety shoes',
        'Violation logging with timestamp',
        'Interactive Streamlit dashboard',
        'Unsafe person image capture',
        'Live status panel with counts and severity levels',
        'Downloadable violation reports (CSV)'
    ],
    github: 'https://github.com/sujitkumar001/PPE-Detection-System-using-Machine-Learning.git',
    demo: 'https://yourproject-demo.vercel.app'

    }
};

// Project card click handlers
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        showProjectModal(projectId);
    });
});

function showProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin: 20px 0;">
        <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 24px;">${project.description}</p>
        
        <h3 style="color: var(--name-color); margin-bottom: 16px;">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px;">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <h3 style="color: var(--name-color); margin-bottom: 16px;">Key Features</h3>
        <ul style="margin-bottom: 32px; padding-left: 20px;">
            ${project.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
        </ul>
        
        <div style="display: flex; gap: 16px; justify-content: center;">
            <a href="${project.github}" target="_blank" class="btn-secondary" style="text-decoration: none;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Code
            </a>
            <a href="${project.demo}" target="_blank" class="btn-secondary" style="text-decoration: none;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;">
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                </svg>
                Live Demo
            </a>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 24px;
                background: var(--white);
                border-left: 4px solid var(--accent-color);
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: var(--shadow-lg);
                z-index: 2000;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out forwards;
            }
            
            .notification-success {
                border-left-color: #10b981;
            }
            
            .notification-error {
                border-left-color: #ef4444;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: var(--text-primary);
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: var(--accent-color);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Effect for Hero Description (Optional Enhancement)
function typeWriter(element, text, speed = 50) {
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

// Initialize typing effect for hero description after page load
window.addEventListener('load', () => {
    const heroDesc = document.querySelector('.hero-description');
    const originalText = heroDesc.textContent;
    
    setTimeout(() => {
        typeWriter(heroDesc, originalText, 30);
    }, 3000);
});

// Parallax Effect for Hero Section (Optional Enhancement)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && window.innerWidth > 768) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Add smooth reveal animation to sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);