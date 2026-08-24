"use strict";

function addClass(ul) {
  const items = ul.children;

  for (const item of items) {
    item.classList.add("list-group-item");

    const ulInsideUl = item.querySelector(":scope > ul"); // :scope > ul — это CSS-селектор, который означает:
    // найти ul, который является непосредственным дочерним элементом текущего элемента.

    if (ulInsideUl) {
      addClass(ulInsideUl);
    }
  }
}

const ul = document.querySelector("ul");
addClass(ul);
