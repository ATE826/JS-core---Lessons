"use strict";

const userForm = document.forms["user-form"];
const userFormInputs = userForm.querySelectorAll(".form-control");
const jsonBtn = document.getElementById("to-json-btn");
const objBtn = document.getElementById("to-object-btn");
const userFormData = document.getElementById("user-form-data");
const jsonData = document.getElementById("user-json-data");

// Constrain Validation API
userForm.noValidate = true;

userForm.addEventListener("submit", validateUserForm);

function validateUserForm(event) {
  for (let input of userFormInputs) {
    const feedbackEl = input.closest("div").querySelector(".invalid-feedback");
    const validationStatus = input.validity;

    const message = validationStatus.valueMissing
      ? "Field is required"
      : validationStatus.patternMismatch
        ? "Enter correct data"
        : validationStatus.tooShort
          ? "Data must contains minimum 4 symbols"
          : validationStatus.typeMismatch
            ? "Enter correct data"
            : "";

    input.setCustomValidity(message);
    feedbackEl.innerText = input.validationMessage;
  }

  event.preventDefault();
  if (!this.checkValidity()) {
    event.stopImmediatePropagation();
    this.classList.add("was-validated");
  } else {
    createUser(this);
    printUser();
    this.reset();
    this.classList.remove("was-validated");
  }
}

const user = {};

let stringifyUser;

function createUser(form) {
  user.name = form.name.value;
  user.email = form.email.value;
  user.nick = form.nick.value;
  user.age = +form.age.value;
}

function printUser() {
  userFormData.innerHTML = `
    name: ${user.name}
    email: ${user.email}
    nick: ${user.nick}
    age: ${user.age}
  `;
}

jsonBtn.onclick = function () {
  stringifyUser = JSON.stringify(user, replaceFunc, 4);
  printJSON(stringifyUser);
};
console.log(typeof stringifyUser);

function replaceFunc(key, value) {
  if (key == "nick") value = value.slice(1);
  return value;
}

function printJSON(json) {
  jsonData.innerHTML = json;
}

// JSON -> Object
objBtn.onclick = function () {
  const obj = JSON.parse(stringifyUser, reviver); // reviver - необязательный параметр
  console.log(obj);
};

function reviver(key, value) {
  if (key == "nick") value = `@${value}`;
  return value;
}
