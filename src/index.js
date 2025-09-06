import "./styles.css";

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
