"use strict";

const listEl = document.getElementById("list-1");
const form = document.forms.pow;

// ==================== РЕКУРСИЯ ====================

// Рекурсия — это когда функция вызывает сама себя.
//
// У рекурсивной функции обязательно должны быть:
// 1. Базовый случай — условие, при котором функция перестаёт вызывать себя.
// 2. Рекурсивный вызов — функция вызывает саму себя,
//    приближаясь к базовому случаю.

console.log("*** РЕКУРСИЯ ***");

function recursionSum(n) {
  // База рекурсии.
  // Когда n становится равным 1,
  // функция перестаёт вызывать сама себя.
  if (n == 1) {
    return 1;
  }

  // Функция вызывает сама себя с уменьшенным n.
  //
  // recursionSum(4)
  // = 4 + recursionSum(3)
  // = 4 + 3 + recursionSum(2)
  // = 4 + 3 + 2 + recursionSum(1)
  // = 4 + 3 + 2 + 1
  // = 10
  return n + recursionSum(n - 1);
}

console.log("Сумма:", recursionSum(4));

// ==================== РЕКУРСИЯ ДЛЯ ВЛОЖЕННЫХ ДАННЫХ ====================

const list = [
  { title: "Item 1", link: "item1.html" },

  {
    title: "Item 2",
    link: "item2.html",

    subitems: [
      { title: "Item 2.1", link: "item21.html" },
      { title: "Item 2.2", link: "item22.html" },
    ],
  },

  {
    title: "Item 3",
    link: "item3.html",

    subitems: [
      { title: "Item 3.1", link: "item31.html" },
      { title: "Item 3.2", link: "item32.html" },

      {
        title: "Item 3.3",
        link: "item33.html",

        subitems: [
          { title: "Item 3.3.1", link: "item331.html" },
          { title: "Item 3.3.2", link: "item332.html" },
        ],
      },

      { title: "Item 3.4", link: "item34.html" },
    ],
  },

  { title: "Item 4", link: "item4.html" },
];

// Функция создаёт HTML-список из массива объектов.
//
// Если у элемента есть subitems,
// функция вызывает сама себя и создаёт вложенный список.
//
// Таким образом здесь также используется рекурсия.

function makeNewList(wrapEl, list) {
  list.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.innerText = item.title;
    a.href = item.link;

    li.append(a);
    wrapEl.append(li);

    // Если у элемента есть вложенные элементы,
    // создаём новый <ul> и рекурсивно вызываем makeNewList().
    if (item.subitems) {
      const ul = document.createElement("ul");

      li.append(ul);

      makeNewList(ul, item.subitems);
    }
  });
}

makeNewList(listEl, list);

// ==================== ДЕКОРАТОРЫ ====================

// Декоратор — это функция, которая принимает другую функцию
// и возвращает новую функцию с дополнительным поведением.
//
// При этом исходная функция не изменяется.
//
// Декоратор может добавлять:
// - кэширование;
// - логирование;
// - проверку данных;
// - измерение времени выполнения;
// - обработку ошибок и т.д.
//
// В нашем случае декоратор добавляет кэширование результатов.

console.log("*** ДЕКОРАТОРЫ ***");

const pow = function (x, y) {
  return x ** y;
};

console.log("Result =", pow(2, 3));

// Декоратор кэширования.

function cacheDecorator(func) {
  // Map хранит результаты предыдущих вызовов.
  const cache = new Map();

  // Возвращаем новую функцию-обёртку.
  return function (...args) {
    // Создаём ключ из аргументов.
    const key = args.join("-");

    let result;

    // Проверяем, есть ли результат в кэше.
    if (cache.has(key)) {
      // Если есть — берём готовый результат.
      result = cache.get(key);

      console.log("From cache");
    } else {
      // Если результата нет,
      // вызываем исходную функцию.

      // apply позволяет сохранить значение this
      // и передать аргументы массивом.
      result = func.apply(this, args);

      // Сохраняем результат в кэш.
      cache.set(key, result);

      console.log("Result is cached");
    }

    return result;
  };
}

// Создаём новую функцию,
// которая использует pow + кэширование.
const cachedPow = cacheDecorator(pow);

form.calc.onclick = function () {
  const base = form.base.value;
  const pow = form.pow.value;

  form.result.value = cachedPow(base, pow);
};

// ==================== ЗАИМСТВОВАНИЕ МЕТОДА ====================

// Заимствование метода — это когда мы используем
// метод одного объекта для другого объекта.
//
// Сам метод можно не копировать.
// Мы просто вызываем его с другим значением this.
//
// Для этого используются call(), apply() или bind().

console.log("*** ЗАИМСТВОВАНИЕ МЕТОДА ***");

const car = {
  model: "unknown",

  getModel() {
    // this будет указывать на объект,
    // для которого вызывается метод.
    return this.model;
  },
};

const car1 = {
  model: "BMW X5",
};

// Берём метод getModel() у объекта car
// и вызываем его для объекта car1.
//
// call(car1) устанавливает:
//
// this === car1
//
// Поэтому this.model === "BMW X5".

console.log("Car model:", car.getModel.call(car1));

// ==================== КАРРИРОВАНИЕ ====================

// Каррирование — это преобразование функции,
// которая принимает несколько аргументов,
// в последовательность функций,
// каждая из которых получает аргументы постепенно.
//
// Было:
//
// f(a, b)
//
// Становится:
//
// f(a)(b)
//
// Например:
//
// sayPhrase("Hi", "Toni")
//
// превращается в:
//
// curriedSayPhrase("Hi")("Toni");

console.log("*** КАРРИРОВАНИЕ ***");

function curry(func) {
  // Возвращаем новую функцию.
  return function curried(...args) {
    // Если аргументов достаточно,
    // вызываем исходную функцию.
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      // Если аргументов недостаточно,
      // возвращаем новую функцию,
      // которая будет ждать следующие аргументы.
      return function (...args2) {
        // Объединяем старые и новые аргументы
        // и снова вызываем curried().
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sayPhrase(greeting, name) {
  return `${greeting}, ${name}`;
}

// Создаём каррированную версию функции.
const curriedSayPhrase = curry(sayPhrase);

// Аргументы передаются по отдельности.
//
// Сначала greeting:
// "Hi"
//
// Затем name:
// "Toni!"

console.log(curriedSayPhrase("Hi")("Toni!"));

// Можно передать оба аргумента сразу,
// потому что функция проверяет их количество.

console.log(curriedSayPhrase("Hi", "Toni!"));

// ==================== ЧАСТИЧНОЕ ПРИМЕНЕНИЕ ====================

// Частичное применение — это создание новой функции,
// в которой некоторые аргументы исходной функции
// уже заранее зафиксированы.
//
// Например, есть:
//
// sayPhrase(greeting, name)
//
// Мы заранее фиксируем greeting:
//
// "Bye"
//
// Получаем новую функцию:
//
// sayBye(name)
//
// Теперь при вызове нужно передать только name.

console.log("*** ЧАСТИЧНОЕ ПРИМЕНЕНИЕ ***");

// bind() создаёт новую функцию,
// в которой первый аргумент уже зафиксирован.
//
// null здесь используется как значение this,
// потому что в данном примере this нам не нужен.
//
// "Bye" становится первым аргументом sayPhrase().

const sayBye = sayPhrase.bind(null, "Bye");

// Фактически:
//
// sayBye("Toni!")
//
// превращается в:
//
// sayPhrase("Bye", "Toni!")

console.log(sayBye("Toni!"));

console.log(sayBye("Luda!"));

// Можно сделать то же самое с помощью каррирования.
//
// Здесь сначала передаём "Bye".
// Возвращается функция, которая ждёт второй аргумент.

const sayBye2 = curriedSayPhrase("Bye");

// Теперь передаём только имя.

console.log(sayBye2("Alex!"));

console.log(sayBye2("Mary!"));
