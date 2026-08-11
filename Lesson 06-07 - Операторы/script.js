"use strict";

let x = 10;
x %= 8;
console.log(x);

x++;
console.log(x);

let a = 2;
let b = "2";

console.log(a == b); // Несторгое равно
console.log(a === b); // Строгое равно

// Сравнивание в "алфавитном порядке"
let s1 = "home";
let s2 = "car";

console.log(`h code: ${s1.codePointAt(0)}, D code ${s2.codePointAt(0)}`);

// Код символа "h" (104) > кода символа "c" (99) => true
console.log(s1 > s2);

// Оператор логического присваивания
let age = null;
age ||= 18;

let f = 10;
f &&= null;

let v = null;
v ??= 204; // Ессли значение левого операнда не определено, присваивается значение правого
console.log(age, f, v);

console.log(null ?? null ?? 1); // Нулевой операнд - возвращает первое определённое значение
