"use srict";

const name = "Anton";
let age = 21;

const user = {
  name,
  age,
};

console.log(user);

const car = {
  name: "Toyota",
  color: "black",
  "production year": 2020,
};

console.log(car);
console.log(car.name, car["production year"]);

const person = {};
person.age = 21;
person.name = "Anton";

delete person.name;

console.log(person);

person.adress = {
  code: 123154,
  city: "Moscow",
  "Number of house": 16,
};

console.log(person);
console.log("age" in person);
console.log("name" in person);

console.log("---");

for (let k in person) {
  console.log(person[k]);
}

const man = {
  name: "Anton",
  // Структура метода
  sayHello: function (personName) {
    console.log(`Hello, ${personName}`);
  },
  // Скоращённая запись
  sayBye() {
    console.log("Bye");
  },
};

for (let k in man) {
  console.log(man[k]);
}
console.log(man.sayHello("Solnyfku"));
