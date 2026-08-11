"use strict";

const btn = document.querySelector(".btn-primary");

function elementCoords(element) {
  const coords = element.getBoundingClientRect();

  console.log(
    `Координаты относительно окна браузера:\n\tX-${coords.x}\n\tY-${coords.y}\n`,
  );
  console.log(
    `Координаты относительно страницы (документа):\n\tX-${coords.x + window.scrollX}\n\tY-${coords.y + window.scrollY}\n`,
  );
  console.log(`Размеры:\n\tWidth-${coords.width}\n\tHeight-${coords.height}\n`);
}

elementCoords(btn);
