"use strict";

function calcSum(a, b) {
  let res = Number(a) + Number(b);
  return res;
}
console.log(calcSum(2, 5));

const mult = function multiplication(a, b) {
  return a * b;
};
console.log(mult(4, 5));

const sayHello = (name) => console.log(`Hello, ${name}`);
sayHello("Anthony");

console.log(calcTwice(7));
function calcTwice(num) {
  return num * 2;
}

console.log("До присвоения:", num);
num = 10;
console.log("После присвоения:", num);
var num;

// IIFE
var k = 3;

// Сторонний скрипт
(function () {
  var k = 10;
  console.log(k * 2);
})();

console.log("k =", k);

// Callback function - ф-ция переданная в др. ф-цию в кач-ве аргумента, которая вызывается по завершению какого-нибудь действия

function getRes(expression, callback) {
  if (expression) callback();
}

function showTrueRes() {
  console.log(true);
}

getRes(2 > 1, showTrueRes);
