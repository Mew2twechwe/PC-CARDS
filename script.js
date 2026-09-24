const catalogueMenu = document.querySelector(".catalogue-menu");
const catalogueToggle = document.querySelector("#catalogueToggle");
const pcToggle = document.querySelector("#pcToggle");
const pcOptions = document.querySelectorAll(".pc-options [data-filter]");
const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");
const activeFilterLabel = document.querySelector("#activeFilter");
const cartCount = document.querySelector("#cartCount");
const addButtons = document.querySelectorAll(".add-button");

const labels = {
  all: "Tout voir",
  limited: "Limited Edition",
  gamer: "PC GAMER",
};

let count = 0;

function setMenuState(open) {
  catalogueMenu.classList.toggle("open", open);
  catalogueToggle.setAttribute("aria-expanded", String(open));
}

function setPcState(open) {
  catalogueMenu.classList.toggle("pc-open", open);
  pcToggle.setAttribute("aria-expanded", String(open));
}

function applyFilter(filter) {
  productCards.forEach((card) => {
    const visible = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("hidden", !visible);
  });

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });

  activeFilterLabel.textContent = labels[filter];
  setMenuState(false);
  setPcState(false);
  document.querySelector("#catalogue").scrollIntoView({ behavior: "smooth", block: "start" });
}

catalogueToggle.addEventListener("click", () => {
  const shouldOpen = !catalogueMenu.classList.contains("open");
  setMenuState(shouldOpen);
  if (shouldOpen) {
    setPcState(true);
  }
});

pcToggle.addEventListener("click", () => {
  setPcState(!catalogueMenu.classList.contains("pc-open"));
});

pcOptions.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    count += 1;
    cartCount.textContent = count;
    button.textContent = "Dans le panier";
    window.setTimeout(() => {
      button.textContent = "Ajouter";
    }, 900);
  });
});

document.addEventListener("click", (event) => {
  if (!catalogueMenu.contains(event.target)) {
    setMenuState(false);
    setPcState(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
    setPcState(false);
    catalogueToggle.focus();
  }
});
