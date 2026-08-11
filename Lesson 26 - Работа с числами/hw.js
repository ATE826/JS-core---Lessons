"use strict";

const sections = document.querySelectorAll("section");

const intersectionConfig = {
  root: null,
  threshold: 0.4,
};

function intersectionCallback(records, observer) {
  for (let record of records) {
    if (record.isIntersecting) {
      if (record.target.tagName == "SECTION") {
        record.target.classList.add("animated");
      }
    }
  }
}

const intersectionObserver = new IntersectionObserver(
  intersectionCallback,
  intersectionConfig,
);

const intersectionNodes = sections;

for (let node of intersectionNodes) {
  intersectionObserver.observe(node);
}
