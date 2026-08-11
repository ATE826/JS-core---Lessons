"use strict";

// email wrapper
const emailWrapper = document.querySelectorAll("form .mb-3")[0];

// email input element
const emailInput = document.getElementById("email");

// email label textNode
const emaillabelText = emailWrapper.querySelector('[for="email"]').firstChild;

// DOM узлы это объекты
console.log("typeof emailInput:", typeof emailInput);
console.log("typeof nodeType:", emailInput.nodeType);
console.log("nodeType in email input:", "nodeType" in emailInput);
console.log("emailInput", emailInput);
console.dir(emailInput);

console.log("length:", emaillabelText.length);
console.log("innerText:", emailWrapper.innerText);

console.log(emailInput.id);
console.log(emailInput.title);
console.log(emailInput.className);
console.log(emailInput.type);

console.log(emailInput.hasAttribute("title"));
emailInput.setAttribute("title", "Email");
console.log(emailInput.getAttribute("title"));
emailInput.removeAttribute("title");
console.log(emailInput.hasAttribute("title"));

console.log("---");
const emailInputAttributes = emailInput.attributes;
for (let a of emailInputAttributes) {
  console.log(`${a.name} : ${a.value}`);
}

const emailInputDataset = emailInput.dataset;
console.log("data-status:", emailInputDataset.status);

// Синхронизация атрибутов и св-в
emailInput.name = "new email";
console.log("New property:", emailInput.getAttribute("name"));

emailInput.setAttribute("value", "email");
emailInput.value = "new email";
console.log("value property:", emailInput.value);
console.log("value attribute:", emailInput.getAttribute("value"));
