"use strict";

const str = " Hello world! ";
const str2 = "Heeeeeey!";
console.log(`str.length: ${str.length}`);
console.log(`str[6]: ${str[6]}`);
console.log(`str.charAt(6): ${str.charAt(6)}`);
console.log(`str.codePointAt(1): ${str.codePointAt(1)} - "${str[1]}"`);
console.log(`str.toUpperCase(): ${str.toUpperCase()}`);
console.log(`str.trim(): ${str.trim()}`);
console.log(`str.split("l"): ${str.split(" ")}`);
console.log(`str.repeat(4): ${str.repeat(4)}`);
console.log(`str.concat(str2): ${str.concat(str2)}`);
console.log(`str.includes("ll"): ${str.includes("ll")}`);

console.log(`str.slice(0, 11): ${str.slice(0, 11)}`);
console.log(`str.substring(0, 11): ${str.substring(0, 11)}`);

const userForm = document.forms["user-form"];
const userFormInputs = userForm.querySelectorAll(".form-control");
const userFormData = document.getElementById("user-form-data");

for (let input of userFormInputs) {
  input.addEventListener("focus", inputFocusHandler);
  input.addEventListener("blur", inputBlurHandler);
}

function inputFocusHandler(event) {
  clearInput(this);
}

function clearInput(input) {
  input.classList.remove("is-valid", "is-invalid");
  const inputFeedbackEl = input.closest("div").querySelector(".feedback");
  inputFeedbackEl.classList.remove("valid-feedback");
  inputFeedbackEl.textContent = "";
}

function inputBlurHandler() {
  switch (this.id) {
    case "name":
      validateName(this);
      break;
    case "email":
      validateEmail(this);
      break;
    case "nick":
      validateNick(this);
  }
}

function validateName(input) {
  const name = input.value;
  if (name.trim().includes(" ")) {
    markValid(input);
    return true;
  } else {
    markInvalid(input);
    return false;
  }
}

function validateEmail(input) {
  const email = input.value;

  if (email.match(/^\S+@\S+\.\S+$/)) {
    markValid(input);
    return true;
  } else {
    markInvalid(input, "Enter correct email address!");
    return false;
  }
}

function validateNick(input) {
  const nick = input.value;
  if (
    nick.trim().includes(" ") == false &&
    nick.length > 2 &&
    nick.startsWith("@")
  ) {
    markValid(input);
    return true;
  } else {
    markInvalid(input);
    return false;
  }
}

function validateEmail(input) {}

function validateEmail(input) {}

function markValid(inputEl, feedbackMessage = "Looks good!") {
  inputEl.classList.add("is-valid");
  const inputFeedbackEl = inputEl.closest("div").querySelector(".feedback");
  inputFeedbackEl.classList.add("valid-feedback");
  inputFeedbackEl.textContent = feedbackMessage;
}

function markInvalid(inputEl, feedbackMessage = "Invalid data!") {
  inputEl.classList.add("is-invalid");
  const inputFeedbackEl = inputEl.closest("div").querySelector(".feedback");
  inputFeedbackEl.classList.add("invalid-feedback");
  inputFeedbackEl.textContent = feedbackMessage;
}
