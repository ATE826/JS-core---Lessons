// ВНЕШНИЕ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (ФАЙЛ - БИБЛИОТЕКА)
// https://www.freecodecamp.org/news/javascript-debounce-example
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export { debounce };
