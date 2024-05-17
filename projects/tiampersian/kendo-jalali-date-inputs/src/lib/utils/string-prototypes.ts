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
