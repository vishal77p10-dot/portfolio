// ===== INITIALIZE LUCIDE ICONS =====
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save theme preference
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.setAttribute('data-lucide', 'sun');
    } else {
        icon.setAttribute('data-lucide', 'moon');
    }
    lucide.createIcons();
}

// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Update icon
    const icon = mobileMenuToggle.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Close mobile menu when a link is clicked
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== DOWNLOAD RESUME =====
const downloadResumeBtn = document.getElementById('download-resume');

downloadResumeBtn.addEventListener('click', () => {
    // Replace with your actual resume PDF path
    alert('Resume download functionality - Add your resume PDF to the project and update the path in script.js');
    
    // Example implementation:
    // const link = document.createElement('a');
    // link.href = 'path/to/your-resume.pdf';
    // link.download = 'YourName_Resume.pdf';
    // link.click();
});

// ===== SCROLL ANIMATIONS =====
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
const animateElements = document.querySelectorAll(
    '.about-grid, .skills-grid > *, .project-card, .experience-card, .education-card, .contact-grid'
);

animateElements.forEach(el => {
    el.classList.add('slide-in');
    observer.observe(el);
});

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contact-form');
const formInputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
};

const errorMessages = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    subject: document.getElementById('subject-error'),
    message: document.getElementById('message-error')
};

const successMessage = document.getElementById('success-message');

// Real-time validation
Object.keys(formInputs).forEach(key => {
    formInputs[key].addEventListener('input', () => {
        validateField(key);
    });
    
    formInputs[key].addEventListener('blur', () => {
        validateField(key);
    });
});

function validateField(fieldName) {
    const field = formInputs[fieldName];
    const errorMsg = errorMessages[fieldName];
    let isValid = true;
    let message = '';
    
    // Clear previous error
    errorMsg.textContent = '';
    field.style.borderColor = '';
    
    // Validation rules
    if (!field.value.trim()) {
        isValid = false;
        message = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    } else if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    } else if (fieldName === 'message') {
        if (field.value.trim().length < 10) {
            isValid = false;
            message = 'Message must be at least 10 characters';
        }
    }
    
    if (!isValid) {
        errorMsg.textContent = message;
        field.style.borderColor = 'var(--error)';
    }
    
    return isValid;
}

function validateForm() {
    let isValid = true;
    
    Object.keys(formInputs).forEach(key => {
        if (!validateField(key)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Hide previous success message
    successMessage.style.display = 'none';
    
    if (validateForm()) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i data-lucide="loader" class="icon"></i> Sending...';
        submitButton.disabled = true;
        lucide.createIcons();
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            lucide.createIcons();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
            // In a real application, you would send the form data to a server
            // Example using Formspree or EmailJS:
            /*
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formInputs.name.value,
                    email: formInputs.email.value,
                    subject: formInputs.subject.value,
                    message: formInputs.message.value
                })
            })
            .then(response => response.json())
            .then(data => {
                // Handle success
                successMessage.style.display = 'block';
                contactForm.reset();
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again.');
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                lucide.createIcons();
            });
            */
        }, 1500);
    }
});

// ===== UPDATE FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - header.offsetHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// ===== CONSOLE MESSAGE =====
console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cInterested in the code? Check out the repository on GitHub!', 'font-size: 14px; color: #6b7280;');

// ===== DYNAMIC GITHUB PROJECTS =====
(async function loadGithubProjects() {
    try {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        const username = grid.getAttribute('data-github-username') || 'vishal77p10-dot';
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!res.ok) throw new Error('Failed to fetch repositories');
        const repos = await res.json();

        // Optional: filter out forks/archived
        const filtered = repos.filter(r => !r.fork && !r.archived);

        // Build cards
        grid.innerHTML = '';
        filtered.forEach(repo => {
            const repoUrl = repo.html_url;
            const name = repo.name;
            const desc = repo.description || 'GitHub repository';
            // Dynamic image based on repo name using dummyimage.com with background color hash
            const color = stringToColor(name);
            const text = encodeURIComponent(name);
            const imgUrl = `https://dummyimage.com/600x400/${color.substring(1)}/ffffff&text=${text}`;

            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-image">
                    <a href="${repoUrl}" target="_blank" rel="noopener noreferrer">
                        <img src="${imgUrl}" alt="${name}">
                    </a>
                </div>
                <div class="project-content">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="project-links">
                        <a href="${repoUrl}" target="_blank" class="btn btn-sm btn-outline">
                            <i data-lucide="github" class="icon"></i>
                            Repo
                        </a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn btn-sm btn-primary"><i data-lucide="external-link" class="icon"></i> Demo</a>` : ''}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        lucide.createIcons();
    } catch (e) {
        console.error('Error loading GitHub projects:', e);
    }
})();

function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).slice(-2);
    }
    // Ensure contrast with white text in dummyimage: keep it dark-ish
    // If color too light, darken
    const rgb = [
        parseInt(color.substring(1,3),16),
        parseInt(color.substring(3,5),16),
        parseInt(color.substring(5,7),16)
    ];
    const luminance = 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2];
    if (luminance > 180) {
        rgb[0] = Math.max(0, rgb[0]-80);
        rgb[1] = Math.max(0, rgb[1]-80);
        rgb[2] = Math.max(0, rgb[2]-80);
        color = '#' + rgb.map(v => ('00' + v.toString(16)).slice(-2)).join('');
    }
    return color;
}
