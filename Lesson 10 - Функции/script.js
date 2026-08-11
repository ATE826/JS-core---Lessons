"use strict";

function calcSum(a, b) {
  let res = Number(a) + Number(b);
  return res;
}

alert(
  `Сумма: ${calcSum(prompt("Введите число 1"), prompt("Введите число 2"))}`,
);

function compare(a, b) {
  if (a == b) return 0;
  else if (a > b) return 1;
  else return -1;
}

console.log(compare(1, 1));
console.log(compare(2, 1));
console.log(compare(1, 2));
