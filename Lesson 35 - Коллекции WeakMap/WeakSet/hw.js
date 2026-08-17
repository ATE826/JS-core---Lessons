"use strict";

const form = document.forms["car-form"];
const inputs = form.querySelectorAll("input");
const successBtn = form.querySelector(".btn-success");

const list = document.querySelector("ul");

successBtn.onclick = function (event) {
  event.preventDefault();

  let name = form.elements.name.value;
  let year = form.elements.year.value;
  let color = form.elements.color.value;

  if (name.trim() == "" || year == "" || color.trim() == "") {
    alert("Не все поля заполнены!");
    return;
  }

  const car = new Car(name, year, color);

  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.textContent = `Car: ${car.name} | Year: ${car.year} | Color: ${car.color}`;
  list.append(li);

  form.elements.name.value = "";
  form.elements.year.value = "";
  form.elements.color.value = "";
};

// Constructer
function Car(name, year, color) {
  this.name = name;
  this.year = year;
  this.color = color;
}
