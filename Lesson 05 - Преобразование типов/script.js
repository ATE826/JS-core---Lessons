"use strict";

console.log("Динамическая типизация данных");

let someVar = 40;
console.log(someVar, typeof someVar);

someVar = "str";
console.log(someVar, typeof someVar);

let num1 = prompt("Enter num1:");
let num2 = prompt("Enter num2:");
let res = num1 + num2; // Здесь складываются строки -> '4' + '5' = 45

console.log(typeof res, res);

res = Number(num1); // Преобразование в число
let num3 = Number(prompt("Enter num3:"));
console.log(typeof res, typeof num3);

console.log("Автоматическое преобразование типов");
const num = 10;
const log = true;
const divide = num / log;
console.log(divide);
