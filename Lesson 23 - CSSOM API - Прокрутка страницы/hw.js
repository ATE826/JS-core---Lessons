"use strict";

const btns = document.querySelectorAll(".btn");

function ScrollHandler(event) {
  event.preventDefault();

  const card = event.target.closest(".card");

  window.scrollBy({
    top: card.offsetHeight + 50,
    behavior: "smooth",
  });
}

btns.forEach((btn) => {
  btn.addEventListener("click", ScrollHandler);
});
