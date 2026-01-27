// Services Data
const services = [
    { 
        name: 'Website Development', 
        icon: '🌐',
        description: 'Custom websites built with modern technologies, responsive design, and optimized performance'
    },
    { 
        name: 'Web Applications', 
        icon: '💻',
        description: 'Full-stack web applications with interactive features and robust functionality'
    },
    { 
        name: 'E-Commerce Solutions', 
        icon: '🛒',
        description: 'Complete online stores with payment integration, inventory management, and admin panels'
    },
    { 
        name: 'Landing Pages', 
        icon: '📄',
        description: 'High-converting landing pages designed to capture leads and drive conversions'
    },
    { 
        name: 'Portfolio Websites', 
        icon: '🎨',
        description: 'Professional portfolio sites to showcase your work and attract clients'
    },
    { 
        name: 'API Integration', 
        icon: '🔌',
        description: 'Seamless integration of third-party APIs and services into your applications'
    },
    { 
        name: 'Website Maintenance', 
        icon: '🔧',
        description: 'Ongoing support, updates, and maintenance to keep your site running smoothly'
    },
    { 
        name: 'Consultation', 
        icon: '💡',
        description: 'Expert advice on technology stack, architecture, and best practices for your project'
    }
];

// Initialize Services Grid
function initProducts() {
    const grid = document.getElementById('productsGrid');
    
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-icon">${service.icon}</div>
            <h3 class="product-name">${service.name}</h3>
            <p class="product-category">${service.description}</p>
        `;
        grid.appendChild(card);
    });
}

// Generate QR Code (Simple SVG-based QR code placeholder)
function generateQRCode() {
    const qrContainer = document.getElementById('qrCode');
    const qrSize = 200;
    
    qrContainer.innerHTML = `
        <svg width="${qrSize}" height="${qrSize}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${qrSize}" height="${qrSize}" fill="white"/>
            <rect x="10" y="10" width="40" height="40" fill="black"/>
            <rect x="150" y="10" width="40" height="40" fill="black"/>
            <rect x="10" y="150" width="40" height="40" fill="black"/>
            <rect x="60" y="30" width="80" height="10" fill="black"/>
            <rect x="30" y="60" width="10" height="80" fill="black"/>
            <rect x="160" y="60" width="10" height="80" fill="black"/>
            <rect x="60" y="160" width="80" height="10" fill="black"/>
            <rect x="80" y="80" width="40" height="40" fill="black"/>
            <rect x="70" y="100" width="15" height="15" fill="white"/>
            <rect x="115" y="100" width="15" height="15" fill="white"/>
            <text x="100" y="230" font-size="12" text-anchor="middle" fill="#666">Scan to connect</text>
        </svg>
    `;
}

// Download vCard
function downloadVCard() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Shreyas
TITLE:Web Developer
TEL;TYPE=CELL:9901787660
EMAIL;TYPE=INTERNET:skowndinya518@gmail.com
NOTE:Professional Web Developer specializing in modern web applications and responsive websites
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shreyas-contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

// Share Profile Functions
function shareProfile(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out Shreyas - Professional Web Developer');
    
    const shareUrls = {
        whatsapp: `https://wa.me/?text=${text}%20${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Copy Link Function
function copyLink() {
    const url = window.location.href;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            fallbackCopyLink(url);
        });
    } else {
        fallbackCopyLink(url);
    }
}

// Fallback copy method for older browsers
function fallbackCopyLink(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    } catch (err) {
        alert('Failed to copy link. Please copy manually: ' + text);
    }
    
    document.body.removeChild(textarea);
}

// Handle Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    // Create WhatsApp message
    const whatsappMessage = `New Project Enquiry:
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Service Needed: ${data.service}
Message: ${data.message}`;
    
    const whatsappUrl = `https://wa.me/919901787660?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    e.target.reset();
    alert('Thank you! Your message will be sent via WhatsApp.');
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    initProducts();
    generateQRCode();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
window.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});