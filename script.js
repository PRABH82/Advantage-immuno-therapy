// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        
        if (isOpen) {
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });
}

// Counter Animation
function animateCounter(element, end, duration = 1400) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * end);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for Stats
const statsSection = document.getElementById('statsSection');
if (statsSection) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach((counter) => {
                        const end = parseInt(counter.getAttribute('data-end'));
                        animateCounter(counter, end);
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );
    observer.observe(statsSection);
}

// Current Year in Footer
const currentYearElements = document.querySelectorAll('#currentYear');
currentYearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
});

// Form Validation (for apply.html)
const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const errors = {};
        
        // Required fields validation
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'cancerType', 'cancerStage', 'diagnosisDate'];
        requiredFields.forEach((field) => {
            const input = document.querySelector(`[name="${field}"]`);
            const errorElement = document.getElementById(`${field}-error`);
            if (input && !input.value.trim()) {
                const fieldLabel = field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                errors[field] = `${fieldLabel} is required`;
                if (errorElement) {
                    errorElement.textContent = errors[field];
                }
            } else if (errorElement) {
                errorElement.textContent = '';
            }
        });
        
        // Email validation
        const emailInput = document.querySelector('[name="email"]');
        const emailError = document.getElementById('email-error');
        if (emailInput && emailInput.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                errors.email = 'Please enter a valid email address';
                if (emailError) {
                    emailError.textContent = errors.email;
                }
            }
        }
        
        // Checkbox validation
        const requiredCheckboxes = ['solidTumorConfirmed', 'ableToTravel', 'availableForTreatment'];
        requiredCheckboxes.forEach((checkbox) => {
            const checkboxInput = document.getElementById(checkbox);
            const errorElement = document.getElementById(`${checkbox}-error`);
            if (checkboxInput && !checkboxInput.checked) {
                errors[checkbox] = 'Please confirm this requirement';
                if (errorElement) {
                    errorElement.textContent = errors[checkbox];
                }
            } else if (errorElement) {
                errorElement.textContent = '';
            }
        });
        
        // If no errors, submit form
        if (Object.keys(errors).length === 0) {
            // Hide form and show success message
            applicationForm.classList.add('hidden');
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.remove('hidden');
            }
            
            // Log form data (in production, send to server)
            const formData = new FormData(applicationForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            console.log('Form submitted:', formDataObj);
        }
    });
}

// File Upload Status Display
const fileInputs = document.querySelectorAll('input[type="file"]');
fileInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        const statusElement = document.getElementById(`${input.name}-status`);
        if (statusElement && e.target.files[0]) {
            statusElement.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 1rem; height: 1rem;">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                ${e.target.files[0].name}
            `;
        }
    });
});

// Page Load Animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(1rem)';
    document.body.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
});
