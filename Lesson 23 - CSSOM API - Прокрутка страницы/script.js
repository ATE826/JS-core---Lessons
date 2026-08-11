"use strict";

// Выбор эл-тов
const header = document.querySelector("header");
const banner = document.querySelector(".banner");
const bannerBtn = banner.querySelector(".btn");
const topBtn = document.querySelector(".btn-top");
const images = document.querySelectorAll(".image");
const sections = document.querySelectorAll("section");

// Смещение баннера вверх

const headerHeight = header.offsetHeight;
banner.style.marginTop = `-${headerHeight}px`;

// Прокрутка к section 1 (scrollTop)

bannerBtn.onclick = function () {
  const scrollHeight = sections[1].getBoundingClientRect().top + window.scrollY;
  document.documentElement.scrollTop = scrollHeight;
};

// Прокрутка к началу страницы
topBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

// Событие Scroll
window.addEventListener("scroll", scrollHandler);

function scrollHandler() {
  const scrollY = window.scrollY;
  changeNavStyle(scrollY); // изменения стиля навигации
  showTopBtn(scrollY);
  animateImageOnScroll();
  scrollSpy(scrollY);
}

// Изменение стилей панели меню
function changeNavStyle(scrollY) {
  if (scrollY > headerHeight) {
    header.classList.remove("bg-transparent");
    header.classList.add("bg-success");
  } else {
    header.classList.add("bg-transparent");
    header.classList.remove("bg-success");
  }
}

function showTopBtn(scrollY) {
  topBtn.hidden = scrollY < document.documentElement.clientHeight;
}

function animateImageOnScroll() {
  for (let image of images) {
    if (
      image.getBoundingClientRect().top +
        image.getBoundingClientRect().height +
        150 <
      document.documentElement.clientHeight
    ) {
      image.classList.add("animated");
    }
  }
}

function scrollSpy(scrollY) {
  for (let section of sections) {
    if (section.offsetTop <= scrollY) {
      document.querySelector(".active").classList.remove("active");
      document
        .querySelector(`a[href="#${section.id}"]`)
        .classList.add("active");
    }
  }
}

// ЗАпрет прокрутки
document.onkeyup = function (event) {
  const winWidth = window.innerWidth;
  const docWinWidth = document.documentElement.clientWidth;
  if (event.code == "KeyA" && document.body.style.overflow != "hidden") {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${winWidth - docWinWidth}px`;
  } else if (event.code == "KeyB") {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = 0;
  }
};
