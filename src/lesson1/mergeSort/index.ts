const merge = <T extends number>(left: T[], right: T[]): T[] => {
  let result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length &&
      rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
      } else {
          result.push(right[rightIndex]);
          rightIndex++;
      }
  }

  return result.concat(left.slice(leftIndex)).
      concat(right.slice(rightIndex));
}

export const mergeSort = <T extends number>(array: T[]): T[] => {
  if (array.length <= 1) {
      return array;
  }
  const middle = Math.floor(array.length / 2);
  const leftHalf = array.slice(0, middle);
  const rightHalf = array.slice(middle);
  return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}
