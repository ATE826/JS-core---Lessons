/**
 * throttle.
 *
 * Напишите функцию `throttle(fn, delay, ctx)` — «тормозилку», которая возвращает обёртку,
 * вызывающую fn не чаще, чем раз в delay миллисекунд.
 * В качестве контекста исполнения используется ctx.
 * Первый вызов fn всегда должен быть синхронным.
 * Если игнорируемый вызов оказался последним, то он должен выполниться.
 */

// пример для delay === 100
// . - вызовы throttledFn
// ! - вызовы fn
// ...............
// !       !        !
// 0ms    100ms    200ms
// .   .       .
// !       !        !
// 0ms    100ms    200ms

function throttle(fn, delay, ctx) {
  // code here
}

function test() {
  const start = Date.now();

  function log(text) {
    const msPassed = Date.now() - start;
    console.log(`${msPassed}: ${this.name} logged ${text}`);
  }

  const throttled = throttle(log, 100, { name: "me" });

  setTimeout(() => throttled("m"), 0);
  setTimeout(() => throttled("mo"), 22);
  setTimeout(() => throttled("mos"), 33);
  setTimeout(() => throttled("mosc"), 150);
  setTimeout(() => throttled("moscow"), 400);

  // 0ms: me logged m
  // 100ms: me logged mos
  // 200ms: me logged mosc
  // 400ms: me logged moscow

  console.clear();
}

test();
