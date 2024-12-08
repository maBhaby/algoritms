export const findSubstr = (S: string, T: string): number[] => {
  const n = S.length;
  const m = T.length;
  
  // Построим префикс-функцию для строки T
  const pi = new Array(m).fill(0);
  let j = 0;
  for (let i = 1; i < m; ++i) {
      while (j > 0 && T[i] !== T[j]) {
          j = pi[j - 1];
      }
      if (T[i] === T[j]) {
          ++j;
      }
      pi[i] = j;
  }

  // Поиск всех вхождений строки T в строку S
  const result: number[] = [];
  j = 0;
  for (let i = 0; i < n; ++i) {
      while (j > 0 && S[i] !== T[j]) {
          j = pi[j - 1];
      }
      if (S[i] === T[j]) {
          ++j;
      }
      if (j === m) {
          result.push(i - m + 1); // Индекс начала вхождения
          j = pi[m - 1];          // Переход к следующему возможному совпадению
      }
  }

  return result;
}
