"use strict";

let user = "Jane";
console.log(user);
const fruit = "apple";
// fruit = "orange";
console.log(fruit);

let a = 5,
  b = 6,
  c = 7;
console.log(a, b, c);

{
  var x = 10;
}

console.log("x=", x);

{
  let y = 20;
}

// console.log("y=", y);

var i = 10;
let j = 20;

console.log("global a:", window.i);
console.log("global b:", window.j);
