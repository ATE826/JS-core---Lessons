"use strict";

const form = document.forms["event-time"];
const nowDateEl = document.getElementById("now-date");
const eventDateEl = document.getElementById("event-date");
const periodEl = document.getElementById("period");

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

form.onsubmit = function (event) {
  event.preventDefault();
  const date = form.date.value;
  const time = form.time.value;

  console.log(date, time);

  const eventDate = new Date(`${date}T${time}`);
  const nowDate = new Date();

  showDate(nowDate, nowDateEl);
  showDate(eventDate, eventDateEl);
  showPeriod(nowDate, eventDate);

  form.reset();
};

function showDate(date, element) {
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const _date = formatNum(date.getDate());

  const hours = formatNum(date.getHours());
  const minutes = formatNum(date.getMinutes());
  const seconds = formatNum(date.getSeconds());
  const miiliseconds = date.getMilliseconds();

  const day = days[date.getDay()];

  element.innerText = `${_date}-${month}-${year}  ${hours}:${minutes}:${seconds}:${miiliseconds}  ${day}`;
}

function showPeriod(date1, date2) {
  const periodTs = +date2 - +date1;
  periodEl.innerText = parseTS(periodTs);
}

function parseTS(timestamp) {
  let reminder;

  const dayLength = 24 * 60 * 60 * 1000;
  const hourLength = 60 * 60 * 1000;
  const minuteLength = 60 * 1000;
  const secondLength = 1000;

  const days = Math.floor((reminder = timestamp) / dayLength);
  const hours = Math.floor((reminder %= dayLength) / hourLength);
  const minutes = Math.floor((reminder %= hourLength) / minuteLength);
  const seconds = Math.floor((reminder %= minuteLength) / secondLength);
  const milliseconds = reminder % secondLength;

  return `${formatNum(days)} DAY : ${formatNum(hours)} HRS : ${formatNum(minutes)} MIN : ${formatNum(seconds)} SEC : ${milliseconds} MSEC`;
}

function formatNum(num) {
  return ("0" + num).slice(-2);
}

// const date1 = new Date();
// console.log(date1);

// const date2 = new Date(2025, 7, 17);
// console.log(date2);

// const date3 = new Date("2026-08-17T11:54:54.000+03:00");
// console.log(date3);

// console.log(date1.getFullYear());
// console.log(date1.getDate());
// console.log(date1.getTimezoneOffset());

// date2.setFullYear(2026);
// console.log(date2);

// const date = new Date();
// console.log(date.toString());
// console.log(date.toUTCString());
