import { bubbleSort } from "./lesson1/bubbleSort";
import { mergeSort } from "./lesson1/mergeSort";
import { quickSort } from "./lesson1/quickSort";

import { findSubstr } from "./lesson2/findSubstr";
import { isCyclicShift } from "./lesson2/cyclicShift";

import { getPSP } from "./lesson3/getPSP";
import { findNextSmaller } from "./lesson3/findNextSmiller";

console.log(bubbleSort([2,5,3,1,99,4,93,23,12,34,5,6,123,5632,234,]))
console.log(mergeSort([2,5,3,1,99,4,93,23,12,34,5,6,123,5632,234,]))
console.log(quickSort([2,5,3,1,99,4,93,23,12,34,5,6,123,5632,234,]))

console.log('findSubstr', findSubstr('ababbababa', 'aba'));
console.log('isCyclicShift', isCyclicShift('zabcd', 'abcdz'));

console.log('getPSP', getPSP('()()(()()'));
console.log('findNextSmaller', findNextSmaller(`10`,`1 2 3 2 1 4 2 5 3 1`));

