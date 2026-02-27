// ==================== CONTACT FUNCTIONS ====================

// ==================== CONTACT FORM ====================

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name    = form.querySelector('input[name="name"]').value.trim();
    const email   = form.querySelector('input[name="email"]').value.trim();
    const phone   = form.querySelector('input[name="phone"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    const checkedServices = Array.from(
      form.querySelectorAll('input[name="service"]:checked')
    ).map((cb) => cb.value);

    if (checkedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    const text =
`Hello! I'm interested in your services.

Name: ${name}
Email: ${email}
Phone: ${phone}
Services: ${checkedServices.join(", ")}
Message: ${message || "N/A"}`;

    const phoneNumber = "917406051534";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    form.reset();
  });
});

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
        title: "Shreyas - Business Head",
        text: "Check out Shreyas's digital business card!",
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
FN:Shreyas
TITLE:Business Head
TEL;TYPE=CELL:96206 09089
X-WHATSAPP;TYPE=CELL:919620609089
END:VCARD`;

  const blob = new Blob([vCardData], { type: "text/vcard" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Shreyas.vcf";
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

// ==================== SERVICE ENQUIRY ====================

function enquireService(serviceName) {
  const phoneNumber = "917406051534";
  const message = `Hello! I'm interested in knowing more about your ${serviceName} services. Could you please provide me with more details?`;
  window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}