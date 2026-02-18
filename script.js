// ==================== CONTACT FUNCTIONS ====================

function makeCall(phoneNumber) {
  window.location.href = `tel:${phoneNumber}`;
}

function openWhatsApp(phoneNumber, contactName) {
  const message = `Hello ${contactName}! I would like to get in touch with you.`;
  window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

function shareCard() {
  if (navigator.share) {
    navigator
      .share({
        title: "Kishore V - Business Manager",
        text: "Check out Kishore V's digital business card!",
        url: window.location.href,
      })
      .catch((err) => console.log("Error sharing:", err));
  } else {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Link copied to clipboard! Share it with others.");
      })
      .catch(() => {
        alert(
          "Unable to share. Please copy the URL manually: " +
            window.location.href
        );
      });
  }
}

function saveContactModern() {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Kishore V
TITLE:Business Manager
TEL;TYPE=CELL:8749060661
X-WHATSAPP;TYPE=CELL:918749060661
END:VCARD`;

  const blob = new Blob([vCardData], { type: "text/vcard" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Kishore_V.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  const btn = document.querySelector(".save-contact-modern");
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Contact Saved!';
  btn.style.background = "#4ade80";
  btn.style.borderColor = "#4ade80";
  btn.style.color = "white";

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = "";
    btn.style.borderColor = "";
    btn.style.color = "";
  }, 2000);
}

// ==================== VISIT COUNTER ====================

function getVisitCount() {
  const visits = localStorage.getItem('siteVisits');
  return visits === null ? 0 : parseInt(visits);
}

function incrementVisitCount() {
  const visits = getVisitCount() + 1;
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
    animateDigit(digit, parseInt(visitsStr[index]), index * 100);
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

// Run on load
displayVisitCount();
