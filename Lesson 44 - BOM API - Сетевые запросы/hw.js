"use strict";

const alert = document.querySelector(".alert");
const btn = document.querySelector(".btn-success");

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Math.floor(Math.random() * 2);
      if (result) {
        resolve("Data is loaded");
      } else {
        reject(new Error("Error during data get..."));
      }
    }, 1500);
  });
}

btn.onclick = async () => {
  alert.classList.remove("alert-success", "alert-danger");
  alert.innerText = "";

  try {
    getData().then(
      (res) => {
        alert.classList.add("alert-success");
        alert.innerText = res;
      },
      (err) => {
        alert.classList.add("alert-danger");
        alert.innerText = err.message;
      },
    );
  } catch (err) {
    console.warn("Error!");
  }
};
