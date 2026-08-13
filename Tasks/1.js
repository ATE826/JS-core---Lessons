/**
 * Дан список целых чисел, повторяющихся элементов в списке нет.
 * Нужно преобразовать это множество в строку,
 * сворачивая соседние по числовому ряду числа в диапазоны.
 */

function compress(list) {
  if (list.length === 0) {
    return "";
  }
  // Сложность алгоритма O(n log n) из-за сортировки
  const sortedList = list.sort((a, b) => a - b);

  const result = [];
  let start = sortedList[0];
  for (let i = 1; i <= sortedList.length; i++) {
    // Если нарушается последовательность чисел
    if (sortedList[i] !== sortedList[i - 1] + 1) {
      // Если 1 символ
      if (start === sortedList[i - 1]) {
        result.push(`${sortedList[i - 1]}`);
      }
      // Если диапазон
      else {
        result.push(`${start}-${sortedList[i - 1]}`);
      }
      start = sortedList[i];
    }
  }

  // Объединяем эл-ты массива в строку через запятую
  return result.join(",");
  j;
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
