// ==================== INITIALIZATION ====================

// Script is at bottom of HTML, so DOM is already ready
displayVisitCount();
setupGalleryItems();
addAnimations();

// ==================== VISIT COUNTER ====================

function getVisitCount() {
    let visits = localStorage.getItem('siteVisits');
    if (visits === null) {
        visits = 0;
    }
    return parseInt(visits);
}

function incrementVisitCount() {
    let visits = getVisitCount();
    visits++;
    localStorage.setItem('siteVisits', visits);
    return visits;
}

function displayVisitCount() {
    const currentVisits = incrementVisitCount();
    const digitsContainer = document.getElementById('viewCounter');
    
    if (!digitsContainer) return;
    
    const visitsStr = currentVisits.toString().padStart(5, '0');
    const digits = digitsContainer.querySelectorAll('.digit');
    
    digits.forEach((digit, index) => {
        const finalValue = parseInt(visitsStr[index]);
        animateDigit(digit, finalValue, index * 100);
    });
}

function animateDigit(digitElement, finalValue, delay) {
    setTimeout(() => {
        let currentValue = 0;
        const interval = setInterval(() => {
            digitElement.textContent = currentValue;
            if (currentValue === finalValue) {
                clearInterval(interval);
            } else {
                currentValue++;
            }
        }, 30);
    }, delay);
}

// ==================== MODERN CONTACT CARD FUNCTIONS ====================

// Make a phone call
function makeCall(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}

// Open WhatsApp with a specific contact
function openWhatsApp(phoneNumber, contactName) {
    const message = `Hello ${contactName}! I would like to know more about your rice products.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Open website
function openWebsite() {
    window.open('https://raghavendracanvasing.in/index.php', '_blank');
}

// Share the card
function shareCard() {
    if (navigator.share) {
        navigator.share({
            title: 'Sri Raghavendra Canvasing',
            text: 'Check out this business for quality rice products!',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareURL = window.location.href;
        navigator.clipboard.writeText(shareURL).then(() => {
            alert('Link copied to clipboard! Share it with others.');
        }).catch(() => {
            alert('Unable to share. Please copy the URL manually: ' + shareURL);
        });
    }
}

// Save contact as VCF
function saveContactModern() {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Sri Raghavendra Canvasing
ORG:Sri Raghavendra Canvasing
TEL;TYPE=CELL:9739413766
TEL;TYPE=CELL:9483533229
X-WHATSAPP;TYPE=CELL:919739413766
X-WHATSAPP;TYPE=CELL:919483533229
URL:https://raghavendracanvasing.in/index.php
NOTE:Quality Rice Products - All Types Available. Contact: Vishal (Primary), Kori Veeresha
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sri_Raghavendra_Canvasing.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Show feedback
    const btn = document.querySelector('.save-contact-modern');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Contact Saved!';
    btn.style.background = '#4ade80';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
}

// ==================== PRODUCT ENQUIRY ====================

function enquireProduct(productName) {
    const phoneNumber = '919739413766';
    const message = `Hello! I'm interested in ${productName}. Please send me more details about this product.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// ==================== SHARE MORE BUTTON ====================

function shareMore() {
    if (navigator.share) {
        navigator.share({
            title: 'Sri Raghavendra Canvasing',
            text: 'Check out this business for quality rice products!',
            url: 'https://raghavendracanvasing.in'
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert('Sharing is not supported on this browser. Please copy the link: https://raghavendracanvasing.in');
    }
}

// ==================== GALLERY ITEMS ====================

function setupGalleryItems() {
    document.querySelectorAll('.gallery-item').forEach((item) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const alt = img.alt;
            openImageModal(img.src, alt);
        });
    });
}

// ==================== IMAGE MODAL ====================

function openImageModal(src, title) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img src="${src}" alt="${title}">
            <p class="modal-title">${title}</p>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
            padding-top: 60px;
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        }
        
        .modal-close {
            position: absolute;
            top: 0;
            right: 0;
            color: white;
            font-size: 40px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: rgba(255, 68, 68, 0.8);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            padding-bottom: 5px;
        }
        
        .modal-close:hover {
            background: rgba(255, 68, 68, 1);
            transform: scale(1.1);
        }
        
        .modal-title {
            color: white;
            font-size: 1.2rem;
            margin-top: 15px;
            font-weight: 600;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// ==================== ANIMATIONS ====================

function addAnimations() {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Fade-in animation for the modern contact card
    const modernCard = document.querySelector('.modern-contact-card');
    if (modernCard) {
        modernCard.style.opacity = '0';
        modernCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            modernCard.style.transition = 'all 0.6s ease';
            modernCard.style.opacity = '1';
            modernCard.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add subtle animations to action buttons
    const actionButtons = document.querySelectorAll('.call-btn, .whatsapp-btn');
    actionButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.4s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 200 + (index * 50));
    });
}

// Optional: Reset visit counter (for testing)
// Uncomment the line below to reset the counter
// localStorage.removeItem('siteVisits');