function makeCall(phoneNumber) {
  window.location.href = `tel:${phoneNumber}`;
}

function openWhatsApp(phoneNumber, contactName) {
  const message = `Hello ${contactName}! I would like to know more about your plant gifting services.`;
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
}

function shareCard() {
  if (navigator.share) {
    navigator.share({
      title: "CHIGURU - Plant Gifting",
      text: "Check out CHIGURU – plant gifting in Mysore!",
      url: window.location.href,
    }).catch((err) => console.log("Error sharing:", err));
  } else {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert("Link copied to clipboard! Share it with others."))
      .catch(() => alert("Please copy the URL manually: " + window.location.href));
  }
}

function saveContactModern() {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Premalatha
ORG:CHIGURU
TITLE:Plant Gifting
TEL;TYPE=CELL:9449280481
X-WHATSAPP;TYPE=CELL:919449280481
EMAIL:chigurugreens@gmail.com
ADR;TYPE=WORK:;;No. 2409, 1st Cross, Hosa Bandikeri, Nanjumalige Circle;Mysore;;Karnataka;India
END:VCARD`;

  const blob = new Blob([vCardData], { type: "text/vcard" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "CHIGURU_Premalatha.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  const btn = document.querySelector(".save-contact-modern");
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Contact Saved!';
  btn.style.background = "#c8efc0";
  btn.style.borderColor = "#4a8c3f";
  btn.style.color = "#2d6a2d";

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = "";
    btn.style.borderColor = "";
    btn.style.color = "";
  }, 2000);
}