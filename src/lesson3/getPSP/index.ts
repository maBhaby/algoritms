export const getPSP = (s: string): number => {
  const stack: string[] = [];
  let ignoreCount = 0;

  for (const char of s) {
      if (char === '(') {
          stack.push(char);
      } else if (char === ')') {
          if (stack.length > 0 && stack[stack.length - 1] === '(') {
              stack.pop();
          } else {
              ignoreCount++;
          }
      }
  }

  return stack.length + ignoreCount;
}
