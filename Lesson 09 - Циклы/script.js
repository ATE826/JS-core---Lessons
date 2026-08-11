"use strict";

for (let i = 1; i < 5; i++) {
  console.log(i);
}

let k = 0;
for (; k < 2; ) {
  console.log(Boolean(k));
  k++;
}

let n = 5;

while (n > 0) {
  console.log(n);
  n--;
}

let i = 1;
do {
  console.log(i);
  i++;
} while (i < 5);

console.log("---");

for (let i = 0; i < 10; i++) {
  if (i == 8) break;
  if (i % 2 == 1) continue;
  console.log(i);
}
console.log("---");
// Использование меток
outer: for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 3; j++) {
    if (j == 2) break outer;
    console.log(j);
  }
}
console.log("---");
let prefix = 0;
while (++prefix < 4) {
  console.log(prefix);
}
