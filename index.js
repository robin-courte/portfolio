window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const fill = document.querySelector(".progress-fill");
  const percentage = document.getElementById("percentage");

  let progress = 0;
  const duration = 2000; // 2s
  const intervalTime = 20; // mise à jour toutes les 20ms
  const increment = (intervalTime / duration) * 100; // pourcentage par intervalle

  const interval = setInterval(() => {
    progress += increment;
    if (progress >= 100) progress = 100;

    fill.style.width = progress + "%";
    percentage.textContent = Math.floor(progress) + "%";

    if (progress >= 100) {
      clearInterval(interval);

      // Fade out du loader
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";

        // Scroll ou affichage sur la barre de navigation
        const navbar = document.querySelector(".navbar"); // ou "#navbar"
        if (navbar) {
          navbar.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, intervalTime);
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".cards li");
  const portfolioSection = document.querySelector(".p-page");
  const page = document.querySelector(".page");

  cards.forEach((card) => {
    const up = card.querySelector(".up");
    const down = card.querySelector(".down");
    const h1s = card.querySelectorAll("h1");
    const coFlous = card.querySelectorAll(".co-flou");

    up.addEventListener("click", () => {
      // Scroll vers la section portfolio
      portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });

      // Bloquer le scroll de la page
      document.body.style.overflow = "hidden";

      // Fermer toutes les cartes et réinitialiser les textes/co-flou
      cards.forEach((c) => {
        c.classList.remove("open");
        c.classList.add("close");
        c.querySelector(".up")?.classList.remove("close");
        c.querySelector(".down")?.classList.remove("open");
        c.querySelectorAll("h1, .co-flou").forEach((el) =>
          el.classList.remove("close")
        );
      });

      // Ouvrir la carte cliquée
      card.classList.add("open");
      card.classList.remove("close");
      up.classList.add("close");
      down.classList.add("open");

      // Masquer les textes et co-flou
      h1s.forEach((el) => el.classList.add("close"));
      coFlous.forEach((el) => el.classList.add("close"));

      // Ajouter .open à la page
      page.classList.add("open");

      // Scroll interne de la carte
      card.style.overflowY = "auto";
      card.style.maxHeight = "100vh"; // limite la carte à la hauteur de l'écran
    });

    down.addEventListener("click", () => {
      // Fermer la carte
      card.classList.remove("open");
      up.classList.remove("close");
      down.classList.remove("open");

      // Débloquer le scroll de la page
      document.body.style.overflow = "";

      // Réafficher les autres cartes
      cards.forEach((c) => {
        if (c !== card) c.classList.remove("close");
      });

      // Retirer .close des textes/co-flou
      h1s.forEach((el) => el.classList.remove("close"));
      coFlous.forEach((el) => el.classList.remove("close"));

      // Retirer .open de la page
      page.classList.remove("open");

      // Retirer scroll interne
      card.style.overflowY = "";
      card.style.maxHeight = "";
    });
  });
});

const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
  const method = document.getElementById("contact-method").value;
  const message = document.getElementById("message").value;

  if (method === "mail") {
    const email = "robin.courte@gmaim.com"; // remplacer par ton email
    const mailtoLink = `mailto:${email}?body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  } else if (method === "tel") {
    const phone = "+330670526468"; // remplacer par ton numéro
    // Pour appeler directement :
    const telLink = `tel:${phone}`;
    // Pour envoyer un SMS (mobile) :
    // const smsLink = `sms:${phone}?body=${encodeURIComponent(message)}`;
    window.location.href = telLink;
  }
});
