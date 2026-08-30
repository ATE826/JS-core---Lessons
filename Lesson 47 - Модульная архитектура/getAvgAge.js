export default function getAvgAge(users) {
  // sum — аккумулятор, накопленное значение с предыдущего шага
  // (в первой итерации равен начальному значению 0, переданному вторым аргументом в reduce)
  // curr — текущий элемент массива, то есть очередной объект user из users на каждой итерации
  return Math.round(
    users.reduce((sum, curr) => sum + curr.age, 0) / users.length,
  ).toFixed(1);
}
