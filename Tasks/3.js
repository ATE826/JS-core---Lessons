/**
 * Необходимо написать функцию, которая разделит каждую строку
 * в массиве `words` по строке `separator`.
 * Необходимо вернуть массив получившихся после разделения строк,
 * исключая пустые строки
 */
// sort((a, b) => a.localCompare(b)) // Сравнение строк
export const splitWordsBySeparator = (words, separator) => {
  const sortedList = [...words].sort((a, b) => a - b);

  const result = [];
  for (let i = 0; i < sortedList.length; i++) {
    const splitWords = sortedList[i].split(separator);
    for (let j = 0; j < splitWords.length; j++) {
      if (splitWords[j] != "") {
        result.push(splitWords[j]);
      }
    }
  }
  return result;
};
console.log(splitWordsBySeparator(["1/", "/2", "/"], "/"));
// ["1", "2"]
