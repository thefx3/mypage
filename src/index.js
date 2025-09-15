import "./styles.css";
import hiking from "./images/hiking.png";
import cooking from "./images/cooking.png";
import restaurant from "./images/restaurant.png";
import netflix from "./images/netflix.png";
import love from "./images/love.png";
import sex from "./images/18.png";
import proposal from "./images/proposal.png";
import cuddling from "./images/cuddling.png";
import waiting from "./images/waiting.png";
import question from "./images/question.png";

const tabs = document.querySelectorAll(".tab");
const selector = document.querySelector(".selector");

function moveSelector(tab) {
  const rect = tab.getBoundingClientRect();
  const parentRect = tab.parentElement.getBoundingClientRect();
  
  selector.style.width = rect.width + "px";
  selector.style.transform = `translateX(${rect.left - parentRect.left}px)`;
}

// Initialisation au chargement
const checked = document.querySelector(".tabs input:checked + label");
if (checked) moveSelector(checked);

// Événement clic sur onglets
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    moveSelector(tab);
  });
});

// Si la fenêtre est redimensionnée, repositionner le selector
window.addEventListener("resize", () => {
  const active = document.querySelector(".tabs input:checked + label");
  if (active) moveSelector(active);
});



// Classe pour créer une carte
class CardItem {
  constructor(title, imgSrc, qty, dataItem) {
    this.title = title;
    this.imgSrc = imgSrc;
    this.qty = qty;
    this.dataItem = dataItem;
  }

  // Génère l'élément DOM d'une carte
  render() {
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("cards");
    cardWrapper.setAttribute("data-items", this.dataItem);

    cardWrapper.innerHTML = `
      <div class="card">
        <img src="${this.imgSrc}" alt="${this.title}">
        <h3>${this.title}</h3>
      </div>
      <h4 class="spots">Spots left : <span class="qty">${this.qty}</span></h4>
    `;
    return cardWrapper;
  }

}

const cards = [
  new CardItem("Hiking", hiking, 20, "hiking"),
  new CardItem("Cooking", cooking, 13, "cooking"),
  new CardItem("Restaurant", restaurant, 50, "restaurant"),
  new CardItem("Netflix & Chill", netflix, 9, "netflix"),
  new CardItem("Having Sex", sex, 99, "sex"),
  new CardItem("Cuddling", cuddling, 13, "cuddling"),
  new CardItem("Making Love", love, 5, "makinglove"),
  new CardItem("Proposal", proposal, 5, "proposal"),
  new CardItem("I choose", question, "?", "mychoice"),
];

// Fonction pour injecter les cartes dans .grid
function loadCards() {
  const grid = document.querySelector(".grid");

  cards.forEach(card => {
    grid.appendChild(card.render());
  });
}

document.addEventListener("DOMContentLoaded", loadCards);

document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".card-container");
  let cards = document.querySelectorAll(".card-inner");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  const cardWidth = 270; // largeur + marge (250px + 20px gap)
  let currentIndex = 1; // on commence sur la vraie première carte

  // Stockage des états (flip + contenu tiré)
  const cardStates = new Map();

  // Exemple de contenu possible au dos
  const backOptions = [
    { title: "Hiking", img: hiking },
    { title: "Cooking", img: cooking },
    { title: "Netflix & Chill", img: netflix },
    { title: "Cuddling", img: cuddling },
    { title: "Making Love", img: love },
    { title: "Having Sex", img: sex },
    { title: "Proposal", img: proposal },
    { title: "Restaurant", img: restaurant },
    { title: "Surprise!", img: waiting },
  ];

  // Clones pour l’infini
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);
  cardContainer.appendChild(firstClone);
  cardContainer.insertBefore(lastClone, cards[0]);
  cards = document.querySelectorAll(".card-inner");

  function updateCarousel(animate = true) {
    if (!animate) {
      cardContainer.style.transition = "none";
    } else {
      cardContainer.style.transition = "transform 0.5s ease";
    }
    const offset = -currentIndex * cardWidth;
    cardContainer.style.transform = `translateX(${offset}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex >= cards.length - 1) return;
    resetCardState(cards[currentIndex]); // reset avant de changer
    currentIndex++;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex <= 0) return;
    resetCardState(cards[currentIndex]);
    currentIndex--;
    updateCarousel();
  });

  cardContainer.addEventListener("transitionend", () => {
    if (cards[currentIndex].isSameNode(firstClone)) {
      resetCardState(cards[currentIndex]);
      currentIndex = 1;
      updateCarousel(false);
    }
    if (cards[currentIndex].isSameNode(lastClone)) {
      resetCardState(cards[currentIndex]);
      currentIndex = cards.length - 2;
      updateCarousel(false);
    }
  });

  // 🎴 Flip logique
  cards.forEach(card => {
    card.addEventListener("click", () => {
      let state = cardStates.get(card);

      // première fois qu’on flip
      if (!state) {
        state = { isFlipped: false, content: null };
        cardStates.set(card, state);
      }

      if (!state.isFlipped) {
        // on retourne -> affiche un hasard si pas encore tiré
        if (!state.content) {
          state.content = backOptions[Math.floor(Math.random() * backOptions.length)];
          const back = card.querySelector(".card-back");
          back.innerHTML = `
            <img src="${state.content.img}" alt="${state.content.title}">
            <h3>${state.content.title}</h3>
          `;
        }
        card.style.transform = "rotateY(180deg)";
        card.classList.add("flipped");
        state.isFlipped = true;
      } else {
        // on retourne face avant
        card.style.transform = "rotateY(0deg)";
        card.classList.remove("flipped");
        state.isFlipped = false;
      }
    });
  });

  // Réinitialisation d’une carte (nouveau tirage quand on revient plus tard)
  function resetCardState(card) {
    card.style.transform = "rotateY(0deg)";
    cardStates.set(card, { isFlipped: false, content: null });
  }

  updateCarousel(false); // init
});


