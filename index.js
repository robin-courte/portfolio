// --------------- LOADER ---------------

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const fill = document.querySelector(".progress-fill");
  const percentage = document.getElementById("percentage");

  let progress = 0;
  const duration = 2000;
  const intervalTime = 20;
  const increment = (intervalTime / duration) * 100;

  const interval = setInterval(() => {
    progress += increment;
    if (progress >= 100) progress = 100;

    fill.style.width = progress + "%";
    percentage.textContent = Math.floor(progress) + "%";

    if (progress >= 100) {
      clearInterval(interval);

      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";

        const navbar = document.querySelector(".navbar");
        if (navbar) {
          navbar.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, intervalTime);
});

// --------------- MENU ---------------

const navbar = document.querySelector(".links");
const other = document.querySelector(".burger-menu-button");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        other.classList.add("visible");
      } else {
        other.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0,
  }
);

observer.observe(navbar);

// ---------------- BURGER MENU ---------------

const burgerMenuButton = document.querySelector(".burger-menu-button");
const burgerMenu = document.querySelector(".burger-menu");

burgerMenuButton.onclick = function () {
  burgerMenu.classList.toggle("open");
  burgerMenuButton.classList.toggle("open");
};

// --------------- CARDS SYSTEMS ---------------

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".cards li");
  const portfolioSection = document.querySelector(".p-page");

  cards.forEach((card) => {
    const up = card.querySelector(".up");
    const down = card.querySelector(".down");
    const h1s = card.querySelectorAll("h1");
    const coFlous = card.querySelectorAll(".co-flou");
    const page = card.querySelector(".page");

    const openCard = () => {
      portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });

      document.body.style.overflow = "hidden";

      cards.forEach((c) => {
        c.classList.remove("open");
        c.classList.add("close");
        c.querySelector(".up")?.classList.remove("close");
        c.querySelector(".down")?.classList.remove("open");
        c.querySelectorAll("h1, .co-flou").forEach((el) =>
          el.classList.remove("close")
        );
        c.querySelector(".page")?.classList.remove("open");
      });

      card.classList.add("open");
      card.classList.remove("close");
      up.classList.add("close");
      down.classList.add("open");

      h1s.forEach((el) => el.classList.add("close"));
      coFlous.forEach((el) => el.classList.add("close"));
      burgerMenuButton.classList.add("hidden");

      page?.classList.add("open");

      card.style.overflowY = "auto";
      card.style.maxHeight = "100vh";
    };

    const closeCard = () => {
      card.classList.remove("open");
      up.classList.remove("close");
      down.classList.remove("open");

      document.body.style.overflow = "";

      cards.forEach((c) => {
        if (c !== card) c.classList.remove("close");
      });

      h1s.forEach((el) => el.classList.remove("close"));
      coFlous.forEach((el) => el.classList.remove("close"));
      burgerMenuButton.classList.remove("hidden");

      page?.classList.remove("open");

      card.style.overflowY = "";
      card.style.maxHeight = "";
    };

    up.addEventListener("click", openCard);
    down.addEventListener("click", closeCard);
  });
});

// ----- CONTACT INFOS -----

// ----- MAIL -----

const textElementMail = document.querySelector(".mail h1");

textElementMail.addEventListener("click", () => {
  const text = textElementMail.innerText;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Texte copié dans le presse-papier !");
    })
    .catch((err) => {
      console.error("Impossible de copier : ", err);
    });
});

// ----- TEL -----

const textElementTel = document.querySelector(".tel h1");

textElementTel.addEventListener("click", () => {
  const text = textElementTel.innerText;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Texte copié dans le presse-papier !");
    })
    .catch((err) => {
      console.error("Impossible de copier : ", err);
    });
});

// ----- CONTACT BUTTON -----

const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
  const method = document.getElementById("contact-method").value;
  const message = document.getElementById("message").value;

  if (method === "mail") {
    const email = "robin.courte@gmaim.com";
    const mailtoLink = `mailto:${email}?body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  } else if (method === "tel") {
    const phone = "+330670526468";
    // Pour appeler directement :
    const telLink = `tel:${phone}`;
    // Pour envoyer un SMS (mobile) :
    // const smsLink = `sms:${phone}?body=${encodeURIComponent(message)}`;
    window.location.href = telLink;
  }
});

// --------------- CAROUSEL DESSIN ---------------

document.querySelectorAll(".carousel-stage").forEach((stage) => {
  const slides = Array.from(stage.querySelectorAll(".slide"));
  const dotsEl = stage.parentElement.querySelector(".dots"); // supposé juste au-dessus
  let current = 0;

  // Création des dots pour ce carousel
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Aller à la diapositive ${i + 1}`);
    b.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(b);
  });
  const dots = Array.from(dotsEl.children);

  function applyState(slide, state) {
    slide.style.zIndex = "1";
    if (state === "center") {
      slide.style.opacity = "1";
      slide.style.transform = "translate(-50%, -50%) scale(1) rotateY(0deg)";
      slide.style.zIndex = "3";
    } else if (state === "left") {
      slide.style.opacity = "0.45";
      slide.style.transform =
        "translate(-120%, -50%) scale(0.86) rotateY(15deg)";
      slide.style.zIndex = "2";
    } else if (state === "right") {
      slide.style.opacity = "0.45";
      slide.style.transform =
        "translate(20%, -50%) scale(0.86) rotateY(-15deg)";
      slide.style.zIndex = "2";
    } else {
      slide.style.opacity = "0";
      slide.style.transform = "translate(-50%, -50%) scale(0.9) rotateY(0deg)";
    }
  }

  function render() {
    const n = slides.length;
    const leftIndex = (current - 1 + n) % n;
    const rightIndex = (current + 1) % n;

    slides.forEach((slide, i) => {
      if (i === current) applyState(slide, "center");
      else if (i === leftIndex) applyState(slide, "left");
      else if (i === rightIndex) applyState(slide, "right");
      else applyState(slide, "hidden");
    });

    dots.forEach((d, i) =>
      d.setAttribute("aria-selected", i === current ? "true" : "false")
    );
  }

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    render();
  }

  function goNext() {
    goTo(current + 1);
  }
  function goPrev() {
    goTo(current - 1);
  }

  stage.addEventListener("click", (e) => {
    const slideEl = e.target.closest(".slide");
    if (!slideEl) return;

    const idx = slides.indexOf(slideEl);
    const leftIndex = (current - 1 + slides.length) % slides.length;
    const rightIndex = (current + 1) % slides.length;

    if (idx === leftIndex) goPrev();
    else if (idx === rightIndex) goNext();
  });

  render();

  window.addEventListener("keydown", (e) => {
    // Gère seulement si le carousel est visible à l'écran
    const rect = stage.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
  });
});

// --------------- PHOTOGRAPHIE ---------------

// Pour chaque bouton .dot-p
document.querySelectorAll(".dot-p").forEach((dot) => {
  dot.addEventListener("click", () => {
    const img = dot.closest("div[class^='img-photo-']").querySelector("img");

    if (img) {
      if (img.requestFullscreen) {
        img.requestFullscreen();
      } else if (img.webkitRequestFullscreen) {
        img.webkitRequestFullscreen();
      } else if (img.msRequestFullscreen) {
        img.msRequestFullscreen();
      }
    }
  });
});

const customPosition = 712; // par ex. 500px depuis le haut de la page

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    window.scrollTo({ top: customPosition, left: 0 });
  }
});

// --------------- UP ON PAGES SYSTEMS ---------------

const boutonsUp = document.querySelectorAll(".p-up");

const cards = [
  ".dessin",
  ".maquette",
  ".p-scolaire",
  ".c-3d",
  ".photo",
  ".c-objet",
];

boutonsUp.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const card = document.querySelector(cards[index]);
    if (!card) return;

    if (card.scrollHeight > card.clientHeight) {
      card.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const topPosition = card.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  });
});

// -------------- PUZZLE ---------------

const puzzle = document.getElementById("puzzle");
const restartBtn = document.getElementById("restart");
let pieces = [];

// 1️⃣ Créer les pièces
function loadPieces() {
  pieces = [];
  for (let i = 1; i <= 15; i++) {
    const img = document.createElement("img");
    img.src = `pieces/piece-${i}.png`; // tes images ici
    img.classList.add("piece");
    img.draggable = true;
    img.dataset.correct = i; // position correcte
    pieces.push(img);
  }
}

// 2️⃣ Mélanger et afficher
function renderPuzzle() {
  puzzle.innerHTML = "";
  pieces.sort(() => Math.random() - 0.5).forEach((p) => puzzle.appendChild(p));
}

// 3️⃣ Drag & Drop (échange complet des éléments)
let dragged = null;

puzzle.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("piece")) dragged = e.target;
});

puzzle.addEventListener("dragover", (e) => {
  e.preventDefault();
});

puzzle.addEventListener("drop", (e) => {
  if (e.target.classList.contains("piece") && dragged) {
    // échange complet des éléments dans le DOM
    const draggedClone = dragged.cloneNode(true);
    const targetClone = e.target.cloneNode(true);

    puzzle.replaceChild(draggedClone, e.target);
    puzzle.replaceChild(targetClone, dragged);

    checkWin();
  }
});

// 4️⃣ Vérifier victoire
function checkWin() {
  const imgs = puzzle.querySelectorAll(".piece");
  let solved = true;
  imgs.forEach((img, index) => {
    if (parseInt(img.dataset.correct) !== index + 1) solved = false;
  });

  if (solved) {
    // On enlève l'alerte et on ajoute la classe .open
    document.querySelector(".p-page").classList.add("open");
    document.querySelector(".pu-p").classList.add("open");
  }
}

// 5️⃣ Bouton recommencer
restartBtn.addEventListener("click", renderPuzzle);

// 6️⃣ Initialisation
loadPieces();
renderPuzzle();
