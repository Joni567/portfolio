const TopTitles = {
  home: {
    fi: "Joni Alaperä – Portfolioni",
    en: "Joni Alaperä – My Portfolio"
  }
};

function setLanguage(lang) {
  // Toggle visible elements
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(el => {
    el.classList.toggle('d-none', el.getAttribute('data-lang') !== lang);
  });

  // Update title
  const page = document.body.getAttribute('data-page');
  if (TopTitles[page] && TopTitles[page][lang]) {
    document.title = TopTitles[page][lang];
  }

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Save user preference
  localStorage.setItem('lang', lang);
}

// Load language on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'fi';
  setLanguage(savedLang);
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const newHash = `#${entry.target.id}`;
        if (window.location.hash !== newHash) {
          history.replaceState(null, null, newHash);
        }
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});
const titles = [
  { fi: "Web-kehittäjä", en: "Web Developer" },
  { fi: "Tuleva pelikehittäjä", en: "Future Game Developer" },
  { fi: "Videopeliharrastaja", en: "Video Game Enthusiast" }
];

const typedElement = document.getElementById("typed-text");
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function currentLang() {
  const hiddenLang = document.querySelector("[data-lang].d-none");
  return hiddenLang ? (hiddenLang.getAttribute("data-lang") === "fi" ? "en" : "fi") : "en";
}

function typeEffect() {
  const lang = currentLang();
  const currentTitle = titles[titleIndex][lang];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  if (typedElement) {
    typedElement.textContent = currentTitle.substring(0, charIndex);
  }

  let delay = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentTitle.length) {
    delay = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 500;
  }

  setTimeout(typeEffect, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  if (typedElement) {
    typeEffect();
  }
});