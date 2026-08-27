"use strict";

const alert = document.querySelector(".alert");

const books = [
  { id: 1245, title: "Mathematics", author: "Kevin Klyin" },
  { id: 1638, title: "Python cookbook", author: "Mark Edvards" },
  { id: 3279, title: "Animal life", author: "Mary Stone" },
  { id: 4055, title: "Fantastic world", author: "Merilin Keeper" },
  { id: 3780, title: "London tube", author: "Bill Tortle" },
];

function showCurrentBook(books) {
  let idx = 0;

  return function () {
    const book = books[idx];

    idx++;

    if (idx == books.length) {
      idx = 0;
    }

    return book;
  };
}

const getCurrentBook = showCurrentBook(books);

function showBook() {
  alert.innerText = `Title: ${this.title}\nAuthor: ${this.author}`;
}

const timer = setInterval(() => {
  showBook.call(getCurrentBook());
}, 2000);

// Версия ф-ции через ...args
// function showCurrentBook() {
//   let idx = 0;

//   return function (...args) {
//     const books = args[0];
//     const book = books[idx];
//     idx++;

//     if (idx == books.length) {
//       idx = 0;
//     }

//     return book;
//   };
// }

// const getCurrentBook = showCurrentBook();
// console.log(getCurrentBook(books));
// console.log(getCurrentBook(books));
// console.log(getCurrentBook(books));
