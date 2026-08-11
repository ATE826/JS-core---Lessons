"use strict";

// Выбор форм
const forms = document.forms;
console.log("Forms:", forms);

const customerForm = forms["customer-form"];

const productForm = forms[1];

// Выбор элементов форм
const customerFormElements = customerForm.elements;
const productFormElements = productForm.elements;

// В коллекции можно обратиться по индексу и по имени

console.log("Email name:", customerFormElements.email.name);
console.log("Email name:", customerForm.email.name);

console.log("Email backlink form:", customerFormElements.email.form.name);

// События focus и blur
for (let element of customerFormElements) {
  if (element.type != "checkbox" && element.type != "submit") {
    element.addEventListener("focus", function () {
      element.style.background = "lightyellow";
      console.log("Active element:", document.activeElement.name);
    });
    element.addEventListener("blur", function () {
      element.style.background = "white";
    });
  }
}

// События Input/Change
customerFormElements.username.oninput = function () {
  console.log("Input value:", this.value);
};

customerFormElements.username.onchange = function () {
  console.log("Change value:", this.value);
};

customerFormElements.country.onchange = function () {
  console.log("Change value:", this.value);
};

customerFormElements.age.onchange = function () {
  console.log("Chacked:", this.checked);
};

// Отправка формы
productForm.onsubmit = function (event) {
  // onsubmit — это обработчик события отправки формы (submit).
  event.preventDefault();
  alert(
    `Subscribe period: ${this.period.value}\nPeriod index: ${this.period.selectedIndex}\nPackage type: ${this.package.value}\nComment: ${this.comment.value}`,
  );
  this.reset();
};
