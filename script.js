// ==================== CONTACT CARD FUNCTIONS ====================

function makeCall(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}

function openWhatsApp(phoneNumber, contactName) {
    const message = `Hello ${contactName}! I would like to know more about your services.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

function shareCard() {
    if (navigator.share) {
        navigator.share({
            title: 'Rashtriya Samruddhi Sauharda Sahakari Sangha',
            text: 'Check out this digital business card!',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        const shareURL = window.location.href;
        navigator.clipboard.writeText(shareURL).then(() => {
            alert('Link copied to clipboard! Share it with others.');
        }).catch(() => {
            alert('Unable to share. Please copy the URL manually: ' + shareURL);
        });
    }
}

function saveContactModern() {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Rashtriya Samruddhi Sauharda Sahakari Sangha
ORG:Rashtriya Samruddhi Sauharda Sahakari Sangha
TEL;TYPE=CELL:9019369789
TEL;TYPE=CELL:7975464382
EMAIL:contact@rashtriyasamruddhi.com
X-WHATSAPP;TYPE=CELL:919019369789
X-WHATSAPP;TYPE=CELL:917975464382
ADR;TYPE=WORK:;;No. 167, 1st Floor, B Block, APMC Yard, Bandipalya;Mysuru;Karnataka;570025;India
NOTE:Digital Business Card - Rashtriya Samruddhi Souharda Sahakari Sangha Niyamita
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Rashtriya_Samruddhi_Contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    const btn = document.querySelector('.save-contact-modern');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Contact Saved!';
    btn.style.background = '#4ade80';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
}

// ==================== APK DOWNLOAD FUNCTION ====================

function downloadAPK() {
    // -------------------------------------------------------
    // IMPORTANT: Replace the URL below with the actual path
    // or hosted URL of your APK file before deploying.
    //
    // Examples:
    //   Local (same server):  './app/RashtriyaSamruddhi.apk'
    //   CDN / cloud storage:  'https://your-cdn.com/RashtriyaSamruddhi.apk'
    //   Google Drive (direct link):
    //     'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID'
    // -------------------------------------------------------
    const apkURL = './app/RASHTRIYA SAMRUDDHI SOUHARDA SAHAKARI SANGHA NIYAMITA.apk';

    const btn = document.querySelector('.apk-download-btn');
    const originalHTML = btn.innerHTML;

    // Visual feedback while initiating download
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Download...';
    btn.disabled = true;

    // Create a hidden anchor and trigger download
    const link = document.createElement('a');
    link.href = apkURL;
    link.download = 'RASHTRIYA SAMRUDDHI SOUHARDA SAHAKARI SANGHA NIYAMITA.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Restore button after short delay
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Download Started!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 800);
}