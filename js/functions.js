/* eslint-disable no-console */
//  Функция проверки на соответствие длины строки заданным условиям
const isValidLength = function (strValue, maxLength) {
  return strValue.toString().length <= maxLength;
};

//  Функция проверки строки на палиндром
const isPalindrome = function (strValue) {
  const strWoSpaces = strValue.replaceAll(' ', '').toUpperCase();
  const newStr = [];
  const strLength = strWoSpaces.length;
  for (let i = 0; i < strLength; i++) {
    newStr[i] = strWoSpaces[strLength - i - 1];
  }
  return newStr.join().replaceAll(',', '') === strWoSpaces;
};

const extractNumber = function (strValue) {
  const trueString = String(strValue);
  let retVal = '';
  for (let i = 0; i < trueString.length; i++) {
    if (!Number.isNaN(parseInt(trueString[i], 10))) {
      retVal += trueString[i];
    }
  }
  return parseInt(retVal, 10);
};

//  Строка длиннее 10 символов
console.log(isValidLength('Привет разработчикам!', 10)); //false
//  Строка короче 100 символов
console.log(isValidLength('Привет разработчикам!', 100)); //true
//  Строка равна 21 символу
console.log(isValidLength('Привет разработчикам!', 21)); //true

//  Строка - не палиндром
console.log(isPalindrome('Привет разработчикам!')); //false
//  Строка - палиндром
console.log(isPalindrome('Лёша на полке клопа нашёл ')); //true

// Извлечение числа
console.log(extractNumber('2023 год')); // 2023
console.log(extractNumber('ECMAScript 2022')); // 2022
console.log(extractNumber('1 кефир, 0.5 батона')); // 105
console.log(extractNumber('агент 007')); // 7
console.log(extractNumber('а я томат')); // NaN
console.log(extractNumber(2023)); // 2023
console.log(extractNumber(-1)); // 1
console.log(extractNumber(1.5)); // 15

// Функция принимает время начала и конца рабочего дня,
// а также время старта и продолжительность встречи в минутах
// и возвращает true, если встреча не выходит за рамки рабочего дня,
// и false, если выходит.
const isValidMeeting = (
  worktimeBegin,
  worktimeEnd,
  meetingBegin,
  meetingDuration
) => {
  const worktimeDateBegin = new Date(0).setHours(...worktimeBegin.split(':'));
  const worktimeDateEnd = new Date(0).setHours(...worktimeEnd.split(':'));
  const meetingDateBegin = new Date(0).setHours(...meetingBegin.split(':'));
  const meetingDateEnd =
    new Date(0).setHours(...meetingBegin.split(':')) +
    meetingDuration * 60 * 1000;

  return (
    meetingDateBegin >= worktimeDateBegin &&
    meetingDateBegin <= worktimeDateEnd &&
    meetingDateEnd >= worktimeDateBegin &&
    meetingDateEnd <= worktimeDateEnd
  );
};

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
console.log(isValidMeeting('08:00', '17:30', '14:00', 90)); // true
console.log(isValidMeeting('8:0', '10:0', '8:0', 120)); // true
console.log(isValidMeeting('08:00', '14:30', '14:00', 90)); // false
console.log(isValidMeeting('14:00', '17:30', '08:0', 90)); // false
console.log(isValidMeeting('8:00', '17:30', '08:00', 900)); // false
