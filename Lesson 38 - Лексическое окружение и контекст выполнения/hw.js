"use strict";

const btn = document.querySelector(".btn");
const alertMessages = document.querySelectorAll(".info");

const user = {
  name: "Toni Tsey",
  age: 21,
  address: "34/35, Palm Beach, Miami, 3456",
};

function getInfo(key) {
  return this[key];
}

btn.addEventListener("click", clickHandler);

function clickHandler() {
  let idx = 0;
  for (let key in user) {
    console.log(getInfo.call(user, key));
    alertMessages[idx].innerText = getInfo.call(user, key);
    idx++;
  }
}
