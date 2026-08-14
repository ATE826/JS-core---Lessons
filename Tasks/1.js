/**
 * Дан список целых чисел, повторяющихся элементов в списке нет.
 * Нужно преобразовать это множество в строку,
 * сворачивая соседние по числовому ряду числа в диапазоны.
 */

function compress(list) {
  if (list.legth == 0) {
    return "";
  }

  const sortedList = [...list].sort((a, b) => a - b);
  const answ = [];

  let startEl = sortedList[0];

  for (let i = 1; i <= sortedList.length; i++) {
    // Если последовтельность не выполняется
    if (sortedList[i] !== sortedList[i - 1] + 1) {
      // Если число
      if (startEl === sortedList[i - 1]) {
        answ.push(`${sortedList[i - 1]}`);
      } else {
        answ.push(`${startEl}-${sortedList[i - 1]}`);
      }
      startEl = sortedList[i];
    }
  }

  return answ.join(",");
}

console.clear();
check(compress([1, 4, 5, 2, 3, 9, 8, 11, 0]), "0-5,8-9,11");
check(compress([1, 4, 3, 2]), "1-4");
check(compress([1, 4]), "1,4");
check(compress([1, 2]), "1-2");
check(compress([]), "");

check(compress([-5, -4, -3, -1, 0, 1, 2, 5]), "-5--3,-1-2,5");
check(compress([-5, -4, -3, -1]), "-5--3,-1");

function check(input, expected) {
  console.assert(
    input === expected,
    "Test case %o: expected %o, but got %o",
    expected,
    expected,
    input,
  );
}

console.log("Tests finished");
