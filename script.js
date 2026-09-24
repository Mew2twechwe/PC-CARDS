const catalogueMenu = document.querySelector(".catalogue-menu");
const catalogueToggle = document.querySelector("#catalogueToggle");
const pcToggle = document.querySelector("#pcToggle");
const pcOptions = document.querySelectorAll(".pc-options [data-filter]");
const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");
const activeFilterLabel = document.querySelector("#activeFilter");
const cartCount = document.querySelector("#cartCount");
const addButtons = document.querySelectorAll(".add-button");
const logoVideo = document.querySelector("#logoVideo");

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

function enableShortLogoLoop(video) {
  if (!video) {
    return;
  }

  const loopEnd = Number(video.dataset.loopEnd || 6);

  video.addEventListener("timeupdate", () => {
    if (video.currentTime >= loopEnd) {
      video.currentTime = 0;
      video.play();
    }
  });

  video.addEventListener("ended", () => {
    video.currentTime = 0;
    video.play();
  });
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

enableShortLogoLoop(logoVideo);
