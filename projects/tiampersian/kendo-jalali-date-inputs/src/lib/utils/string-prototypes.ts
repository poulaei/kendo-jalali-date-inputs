declare global {
  interface String {
    toPerNumber(): string;
    toEnNumber(): string;
    toMomentDateTimeFormat(): string;
  }
}

String.prototype.toPerNumber = function () {
  return this.replace(/\d/g, (match) => {
    return enToPerNumberMap[match] || match;
  });
};
String.prototype.toEnNumber = function () {
  return this.replace(/[۱۲۳۴۵۶۷۸۹۰]/g, (match) => {
    return perToEnNumberMap[match] || match;
  });
};
String.prototype.toMomentDateTimeFormat = function () {
  let x = this.replace(/d/g, 'D')
  .replace(/aa/ig, (m) => m[0])
  .replace(/_/g, '/')
  .replace(/[y]{1,}/, 'YYYY');

  return x;
};

export const enToPerNumberMap = {
  1: '۱',
  2: '۲',
  3: '۳',
  4: '۴',
  5: '۵',
  6: '۶',
  7: '۷',
  8: '۸',
  9: '۹',
  0: '۰'
};
export const perToEnNumberMap = {
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
  '۰': '0'
};

export  enum ValidKeys {
  ArrowDown = 40,
  ArrowLeft = 37,
  ArrowRight = 39,
  ArrowUp = 38,
  Backspace = 8,
  Control = 17,
  Delete = 46,
  Digit0 = 48,
  Digit1 = 49,
  Digit2 = 50,
  Digit3 = 51,
  Digit4 = 52,
  Digit5 = 53,
  Digit6 = 54,
  Digit7 = 55,
  Digit8 = 56,
  Digit9 = 57,
  Numpad0 = 96,
  Numpad1 = 97,
  Numpad2 = 98,
  Numpad3 = 99,
  Numpad4 = 100,
  Numpad5 = 101,
  Numpad6 = 102,
  Numpad7 = 103,
  Numpad8 = 104,
  Numpad9 = 105,
  End = 35,
  Enter = 13,
  Escape = 27,
  Home = 36,
  Insert = 45,
  Tab = 9,
  Space = 32,
  //Salsh = 191,
 // NumpadDivide=111
}
