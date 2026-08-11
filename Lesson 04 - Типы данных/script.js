"use strict";

console.log("Числа");
let num = 2;
console.log(num);

console.log("Большие числа");
const bigInt = 123456789n;
console.log(bigInt);

console.log("Большие числа");
const str1 = "Age: ";
const str2 = str1 + `${2026 - 2005}`;
console.log(str2);

const a = '"You" bro';
const b = "I\'am your father";
console.log(a);
console.log(b);

console.log("Логичекие значения");
let c = true;
console.log(c);

console.log("Нуль и неопределено");
let n = null;
let u = undefined;
console.log(n, u);

console.log("Символ");
const s = Symbol();
console.log(s);

console.log("Объект");

const obj = window;

const user = {
  name: "Anton",
  age: 23,
  sayHello() {
    console.log("Hello");
  },
};

console.log(obj, user);

console.log("Проверка данных");

let str = "str";
console.log(typeof 23, typeof str);
