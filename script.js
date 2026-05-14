// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Tracking functionality
const trackingInput = document.getElementById('trackingInput');
const trackBtn = document.getElementById('trackBtn');
const trackingResults = document.querySelector('.tracking-results');
const heroSection = document.querySelector('.hero');

// Sample tracking data
const sampleData = {
    'ABC1234567': {
        blNumber: 'ABC1234567',
        containerNumber: 'TLLU1234567',
        vesselName: 'EVER ACE',
        eta: '2024-01-22 11:00 AM',
        portLoading: 'Shanghai, CN',
        portDischarge: 'Los Angeles, US'
    },
    'XYZ9876543': {
        blNumber: 'XYZ9876543',
        containerNumber: 'MSKU4567890',
        vesselName: 'MSC Gülsün',
        eta: '2024-01-25 09:30 AM',
        portLoading: 'Singapore, SG',
        portDischarge: 'Rotterdam, NL'
    }
};

// Track button functionality
trackBtn.addEventListener('click', performTracking);
trackingInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performTracking();
    }
});

function performTracking() {
    const inputValue = trackingInput.value.trim().toUpperCase();
    
    if (!inputValue) {
        alert('Please enter a BL Number or Container Number');
        return;
    }

    // Simulate API call
    setTimeout(() => {
        const data = sampleData[inputValue] || generateRandomData(inputValue);
        displayTrackingResults(data);
        trackingResults.classList.remove('hidden');
        heroSection.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Scroll to results
        trackingResults.scrollIntoView({ behavior: 'smooth' });
    }, 1500);

    // Show loading state
    trackBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tracking...';
    trackBtn.disabled = true;
}

function generateRandomData(inputValue) {
    const vessels = ['EVER ACE', 'MSC Gülsün', 'COSCO Shipping Universe', 'OOCL Germany', 'HMM Algeciras'];
    const portsLoading = ['Shanghai, CN', 'Singapore, SG', 'Busan, KR', 'Hong Kong, HK'];
    const portsDischarge = ['Los Angeles, US', 'Rotterdam, NL', 'Hamburg, DE', 'New York, US'];
    
    return {
        blNumber: inputValue,
        containerNumber: inputValue.replace(/[^A-Z0-9]/g, '') + Math.random().toString(36).substr(2, 4).toUpperCase(),
        vesselName: vessels[Math.floor(Math.random() * vessels.length)],
        eta: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString(),
        portLoading: portsLoading[Math.floor(Math.random() * portsLoading.length)],
        portDischarge: portsDischarge[Math.floor(Math.random() * portsDischarge.length)]
    };
}

function displayTrackingResults(data) {
    document.getElementById('blNumber').textContent = data.blNumber;
    document.getElementById('containerNumber').textContent = data.containerNumber;
    document.getElementById('vesselName').textContent = data.vesselName;
    document.getElementById('eta').textContent = data.eta;
    document.getElementById('portLoading').textContent = data.portLoading;
    document.getElementById('portDischarge').textContent = data.portDischarge;
    
    // Reset button
    trackBtn.innerHTML = '<span>Track</span><i class="fas fa-arrow-right"></i>';
    trackBtn.disabled = false;
}

// Show search again
function showSearch() {
    trackingResults.classList.add('hidden');
    heroSection.style.display = 'flex';
    trackingInput.value = '';
    trackingInput.focus();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(13, 35, 61, 0.98)';
        navbar.style.padding = '0.8rem 0';
    } else {
        navbar.style.background = 'rgba(13, 35, 61, 0.95)';
        navbar.style.padding = '1rem 0';
    }
});

// Input formatting
trackingInput.addEventListener('input', function() {
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
});

// Auto-format input examples
const examples = ['ABC1234567', 'XYZ9876543'];
trackingInput.placeholder = `Enter BL Number or Container Number (e.g. ${examples[0]})`;

// Animate stats on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        stat.style.opacity = '1';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.result-card, .timeline-section, .map-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    trackingInput.focus();
});
