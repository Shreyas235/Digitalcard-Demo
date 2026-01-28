// ==================== INITIALIZATION ====================

// Script is at bottom of HTML, so DOM is already ready
displayVisitCount();
setupScrollButton();
setupProductMenu();
setupGalleryItems();
setupContactCardInteractions();
setupReviewAndQRInteractions();
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
        }, 30);  // Faster animation (was 50ms, now 30ms)
    }, delay);
}

// ==================== SAVE CONTACT BUTTON ====================

const saveContactBtn = document.getElementById('saveContactBtn');
if (saveContactBtn) {
    saveContactBtn.addEventListener('click', function() {
        const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Sri Raghavendra Canvassing
ORG:Sri Raghavendra Canvassing
TEL;TYPE=CELL:9739413766
EMAIL:sriraghavendracanvassing5@gmail.com
URL:https://raghavendracanvasing.in/index.php
NOTE:All Types of Rice
END:VCARD`;

        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Sri_Raghavendra_Canvassing.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    });
}

// ==================== CONTACT CARD INTERACTIONS ====================

function setupContactCardInteractions() {
    document.querySelectorAll('.detail-item').forEach(item => {
        const icon = item.querySelector('i');
        const text = item.querySelector('span').textContent;
        
        if (icon.classList.contains('fa-phone')) {
            item.addEventListener('click', function() {
                window.location.href = `tel:${text}`;
            });
        } 
        else if (icon.classList.contains('fa-whatsapp')) {
            item.addEventListener('click', function() {
                window.open(`https://wa.me/91${text}`, '_blank');
            });
        } 
        else if (icon.classList.contains('fa-envelope')) {
            item.addEventListener('click', function() {
                window.location.href = `mailto:${text}`;
            });
        } 
        else if (icon.classList.contains('fa-globe')) {
            item.addEventListener('click', function() {
                window.open('https://raghavendracanvasing.in/index.php', '_blank');
            });
        } 
        else if (icon.classList.contains('fa-map-marker-alt')) {
            item.addEventListener('click', function() {
                window.open('https://maps.app.goo.gl/dV3suFLp1poSfNAG7', '_blank');
            });
        }
    });
}

// ==================== CONTACT US BUTTON ====================

function handleContactClick() {
    const phoneNumber = '919739413766';
    const message = 'Hello! I would like to know more about your rice products.';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// ==================== REVIEW & QR INTERACTIONS ====================

function setupReviewAndQRInteractions() {
    const reviewCircle = document.querySelector('.review-circle');
    if (reviewCircle) {
        reviewCircle.addEventListener('click', function() {
            const googleReviewURL = 'https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review';
            window.open(googleReviewURL, '_blank');
        });
    }

    const instagramHandle = document.querySelector('.instagram-handle');
    if (instagramHandle) {
        instagramHandle.addEventListener('click', function() {
            window.open('https://www.instagram.com/marsimpex_mass/', '_blank');
        });
    }

    const qrCard = document.querySelector('.qr-code-card');
    if (qrCard) {
        qrCard.style.cursor = 'pointer';
        qrCard.addEventListener('click', function() {
            window.open('https://www.instagram.com/marsimpex_mass/', '_blank');
        });
    }
}

// ==================== SCROLL TO TOP BUTTON ====================

function setupScrollButton() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== SHARE MORE BUTTON ====================

function shareMore() {
    if (navigator.share) {
        navigator.share({
            title: 'Sri Raghavendra Canvassing',
            text: 'Check out this business - All Types of Rice!',
            url: 'https://raghavendracanvasing.in'
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert('Sharing is not supported on this browser. Please copy the link: https://raghavendracanvasing.in');
    }
}

// ==================== PRODUCT MENU ====================

function setupProductMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    const galleries = document.querySelectorAll('.gallery-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            
            galleries.forEach(gallery => {
                gallery.style.display = 'none';
            });
            
            const selectedGallery = document.getElementById(category);
            if (selectedGallery) {
                selectedGallery.style.display = 'block';
                
                setTimeout(() => {
                    selectedGallery.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
            }
        });
    });
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
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        }
        
        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 40px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            color: #ff4444;
            transform: scale(1.2);
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
    
    // Simple quick fade-in for contact card (no transform)
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        contactCard.style.opacity = '1';
    }
    
    // Add pulse animation to contact button
    setInterval(() => {
        const btn = document.querySelector('.contact-us-btn');
        if (btn) {
            btn.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                btn.style.animation = '';
            }, 500);
        }
    }, 5000);
    
    // Add pulse animation CSS
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(pulseStyle);
}

// Optional: Reset visit counter (for testing)
// Uncomment the line below to reset the counter
// localStorage.removeItem('siteVisits');