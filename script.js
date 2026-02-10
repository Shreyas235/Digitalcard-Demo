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