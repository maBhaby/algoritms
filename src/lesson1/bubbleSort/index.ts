export const bubbleSort = (arr: number[]): number[] => {
  const cloneArr = [...arr]

  for (let j = cloneArr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (cloneArr[i] > cloneArr[i + 1]) {
        let temp = cloneArr[i];
        cloneArr[i] = cloneArr[i + 1];
        cloneArr[i + 1] = temp;
      }
    }
  }

  return cloneArr
}