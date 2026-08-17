// setTimeout(function greet() {
//   console.log("Hello!");
// }, 2000);

// console.log("After 2 seconds, you will see a greeting in the console!");

// // Промисы
const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Promise resolved!");
  }, 5000);
});

promise1.then((message) => {
  console.log(message);
});

const nameme = "Антон";

setTimeout(
  (name) => {
    console.log(name);
  },
  1000,
  nameme,
);

// Промис

// const promise = new Promise((resolve, reject) => {
//   // асинхронный код

//   if (успех) {
//     resolve(результат);
//   } else {
//     reject(ошибка);
//   }
// });

// function getPromise(value) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const success = value;
//       if (success) {
//         resolve("Promise resolved successfully!");
//       } else {
//         reject("Promise rejected!");
//       }
//     }, 3000);
//   });
// }

// const myPromise1 = getPromise(true);
// const myPromise2 = getPromise(false);

// myPromise1
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// myPromise2
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.error(error);
//   .finally(() => { // Выполняется в любом случае
//     console.log("Promise has been settled (either resolved or rejected).");})
//   });

// // ASYNC / AWAIT

// async function sayHi() {
//   return "Hi!";
// }

// console.log(sayHi()); // Promise { 'Hi!' }

// sayHi().then((message) => {
//   console.log(message); // Hi!
// });

// // Пример!!!

// async function test() {
//   console.log(
//     "1- I'm starting the async function... before the await statement.\n",
//   );

//   // Приостанавливаем выполнение этой функции,
//   // пока Promise не завершится через 2 секунды.
//   const res = await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Promise resolved!\n");
//     }, 2000);
//   });

//   console.log(res);
//   // После завершения Promise функция продолжает выполнение здесь.
//   console.log("2- Promise has resolved!\n");
// }

// test();

// console.log(
//   "3- This message is logged immediately after calling test(), while the function is paused at await.\n",
// );

// Promise.resolve(10)
//   .then((x) => x * 2)
//   .then((x) => x + 5)
//   .then((x) => console.log(x)); // 25

async function getNumber() {
  return 42;
}

const result = getNumber();
console.log(result); // Promise { 42 }

getNumber().then((result) => console.log(result)); // 42

// Статические методы

// 1) Создаёт успешно выполненный промис.
const promise = Promise.resolve(10);

promise.then((value) => {
  console.log(value); // 10
});

// 2) Создаёт отклонённый промис

Promise.reject("Ошибка").catch((error) => {
  console.log(error); // Ошибка
});

// 3) Ждёт выполнения всех промисов.

const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

Promise.all([p1, p2, p3]).then((values) => {
  console.log(values);
});

// 4) Ждёт первый завершившийся промис.

const x1 = new Promise((resolve) => setTimeout(() => resolve("первый"), 1000));

const x2 = new Promise((resolve) => setTimeout(() => resolve("второй"), 500));

Promise.race([x1, x2]).then((value) => {
  console.log(value); // "второй"
});

// 5) Ждёт все промисы, даже если некоторые завершились ошибкой.

Promise.allSettled([
  Promise.resolve(10),
  Promise.reject("Ошибка"),
  Promise.resolve(30),
]).then((results) => {
  console.log(results);
});

// Возвращает первый успешно выполненный промис.

Promise.any([
  Promise.reject("Ошибка 1"),
  Promise.resolve("Успех"),
  Promise.resolve("Другой успех"),
]).then((value) => {
  console.log(value); // "Успех"
});

// | Метод                  | Что ждёт                          |
// | ---------------------- | --------------------------------- |
// | `Promise.all()`        | **все успешно**                   |
// | `Promise.race()`       | **первый завершившийся**          |
// | `Promise.allSettled()` | **все, независимо от результата** |
// | `Promise.any()`        | **первый успешный**               |
// | `Promise.resolve()`    | создаёт успешный Promise          |
// | `Promise.reject()`     | создаёт ошибочный Promise         |
