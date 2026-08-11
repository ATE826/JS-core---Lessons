"use strict";

// Методы примитивов
let n = 10;
console.log(n, typeof n);

n = n.toString();
console.log(n, typeof n);

const numRes = document.getElementById("num-results");

const million1 = 1000000;
const million2 = 1_000_000;
const million3 = 1e6;

document.getElementById("print-million").onclick = function () {
  numRes.innerHTML = `
  million1: ${million1} <br>
  million2: ${million2} <br>
  million3: ${million3}
  `;
};

// Системы счисления
document.getElementById("number-systems").onclick = function () {
  // 100 в различных системах счисления переводим в десятичную, потом десятичные числа переводим в различные системы счисления
  numRes.innerHTML = `
  0b100: ${0b100} <br> 
  0o100: ${0o100} <br>
  0x00: ${0x100} <br>
  4..toString(2): ${(4).toString(2)} <br>
  64..toString(8): ${(64).toString(8)} <br>
  256..toString(16): ${(256).toString(16)}`;
};

const parseStr = "4.5rem";
document.getElementById("parse-strings").onclick = function () {
  numRes.innerHTML = `
  Number("${parseStr}"): ${Number(parseStr)} <br>
  Number.parseInt("${parseStr}"): ${Number.parseInt(parseStr)} <br>
  Number.parseFloat("${parseStr}"): ${Number.parseFloat(parseStr)} <br>
  Number.isFinite("${parseStr}"): ${Number.isFinite(parseStr)} <br>
  Number.isNaN("${parseStr}"): ${Number.isNaN(parseStr)}
  `;
};

document.getElementById("math-methods").onclick = function () {
  numRes.innerHTML = `
  Math.min(3, 5, 6, 7): ${Math.min(3, 5, 6, 7)} <br>
  Math.pow(2, 4): ${Math.pow(2, 4)} <br>
  Math.sin(30deg): ${Math.sin((Math.PI * 30) / 180)} <br>
  `;
};

// Неточность вычислений
console.log(5.1 + 0.3 === 5.4); // false
console.log(+(5.1 + 0.3).toFixed(1) === 5.4); // true toFixed(1) - точность округление до 1 знака после запятой (возвращает в виде текста, пожтому ставим + чтоюы сделать числом)

document.getElementById("math-round").onclick = function () {
  const n = 13 / 3;
  numRes.innerHTML = `
  num: ${n} <br>
  Rounded: ${Math.ceil(n)}
  `;
};

document.getElementById("math-random").onclick = function () {
  const min = 3;
  const max = 13;
  numRes.innerHTML = `
  Random: ${Math.random()} <br>
  Random (1-10): ${Math.floor(Math.random() * 10 + 1)}
  Random (min-max): ${Math.floor(min + Math.random() * (max + 1 - min))}
  `;
};
