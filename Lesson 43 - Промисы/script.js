"use strict";

/**
 * ==========================================
 *           PROMISE API - МЕТОДЫ
 * ==========================================
 *
 * --- МЕТОДЫ ЭКЗЕМПЛЯРА (вызываются на промисе) ---
 *
 * .then(onFulfilled, onRejected)
 *   — обрабатывает успешное выполнение и/или ошибку промиса
 *   — возвращает новый промис
 *
 * .catch(onRejected)
 *   — обрабатывает ошибку промиса (сокращение для .then(null, onRejected))
 *   — возвращает новый промис
 *
 * .finally(onFinally)
 *   — выполняется в любом случае (и при resolve, и при reject)
 *   — не получает результат, используется для очистки/завершающих действий
 *
 *
 * --- СТАТИЧЕСКИЕ МЕТОДЫ (вызываются на классе Promise) ---
 *
 * Promise.resolve(value)
 *   — создаёт уже выполненный промис с указанным значением
 *
 * Promise.reject(error)
 *   — создаёт уже отклонённый промис с указанной ошибкой
 *
 * Promise.all(iterable)
 *   — ждёт выполнения ВСЕХ промисов
 *   — если хотя бы один отклонён — сразу reject со своей ошибкой
 *   — результат: массив значений в том же порядке
 *
 * Promise.allSettled(iterable)
 *   — ждёт завершения ВСЕХ промисов (не важно, успех или ошибка)
 *   — результат: массив объектов { status, value / reason }
 *
 * Promise.race(iterable)
 *   — возвращает результат ПЕРВОГО завершившегося промиса
 *   — (не важно, успех это или ошибка)
 *
 * Promise.any(iterable)
 *   — возвращает результат ПЕРВОГО УСПЕШНОГО промиса
 *   — если все отклонены — reject с AggregateError
 *
 * ==========================================
 */

const alert = document.querySelector(".alert");

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(src);

    script.onerror = () => reject(new Error(`Error in sript loading: ${src}`));

    document.head.append(script);
  });
}

const promise = loadScript("one.js");
console.log(promise);
promise.then(
  (script) => console.log(`${script} is loaded`),
  (error) => console.log(`Error: ${error.message}`),
);

// Цепочка промисов
// loadScript("one.js")
//   .then((script) => loadScript("two.js"))
//   .then((script) => loadScript("three.js"))
//   .then((script) => {
//     // Скрипты загружены, можно использовать объявленные в них ф-ции
//     one();
//     two();
//     three();
//   });

new Promise((resolve, reject) => {
  resolve("Result 1");
})
  .then((result) => {
    console.log("chaining:", result);
    return "Result 2";
  })
  .then((result) => {
    console.log("chaining:", result);
  });

// Promise API
Promise.all([
  loadScript("one.js"),
  loadScript("two.js"),
  loadScript("three.js"),
]).then((result) => {
  console.log("========== PROMISE ALL ==========");
  console.log(result);
  one();
  two();
  three();
  console.log("=================================");
});

Promise.allSettled([
  loadScript("one.js"),
  loadScript("two.js"),
  loadScript("three.js"),
]).then((result) => {
  console.log("========== PROMISE ALLSETTLED ==========");
  console.log(result);
  one();
  two();
  three();
  console.log("=================================");
});

// Async / await

async function loadSource(src) {
  try {
    await loadScript(src);
    alert.classList.add("alert-info");
    alert.innerText = str;
  } catch (error) {
    console.warn(`Error: ${error.message}`);
  }
}

loadSource("myscript.js");
