export const findNextSmaller = (arr: number[]): number[] => {
  const n = arr.length;
  const result: number[] = Array(n).fill(-1);
  
  const stack: number[] = [];
  
  for (let i = 0; i < n; i++) {
    while (stack.length && arr[stack[stack.length - 1]] > arr[i]) {
      result[stack.pop()!] = i;
    }
    
    stack.push(i);
  }
  
  return result;
}