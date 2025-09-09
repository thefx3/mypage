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
      <h4>Spots left : <span class="qty">${this.qty}</span></h4>
    `;

    return cardWrapper;
  }
}

// Fonction pour injecter les cartes dans .grid
function loadCards() {
  const grid = document.querySelector(".grid");

  const cards = [
    new CardItem("Hiking", hiking, 20, "hiking"),
    new CardItem("Cooking", cooking, 13, "cooking"),
    new CardItem("Restaurant", restaurant, 50, "restaurant"),
    new CardItem("Netflix & Chill", netflix, 9, "netflix"),
    new CardItem("Having Sex", sex, 99, "sex"),
    new CardItem("Cuddling", cuddling, 13, "cuddling"),
    new CardItem("Making Love", love, 5, "makinglove"),
    new CardItem("Proposal", proposal, 5, "proposal"),
    
  ];

  cards.forEach(card => {
    grid.appendChild(card.render());
  });

}

// Charger les cartes après le chargement du DOM
document.addEventListener("DOMContentLoaded", loadCards);
