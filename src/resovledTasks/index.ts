function createService(id: number): () => Promise<string> {
  return async () => {
    const delay = Math.random() * 2000 + 500;
    await new Promise((res) => setTimeout(res, delay));
    console.log(`Сервис ${id} завершён (время: ${delay.toFixed(0)}ms)`);
    return `result_${id}`;
  };
}

async function execute(
  tasks: (() => Promise<any>)[],
  result: any[],
  completeJobs: { current: number }
) {
  console.log("init");

  while (tasks.length > completeJobs.current) {
    const task = tasks[completeJobs.current];
    ++completeJobs.current;

    const res = await task();
    result.push(res);
  }
  о;
}

async function ping(len: number, n: number) {
  const result: any[] = [];

  const tasks = Array.from({ length: len }, (_, i) => createService(i + 1));

  let completeJobsRef = {
    current: 0,
  };

  const workers = new Array(n).fill(
    async () => await execute(tasks, result, completeJobsRef)
  );

  await Promise.all(workers.map((worker) => worker()));

  return result;
}

ping(10, 5);

const resolveFunc = async (acc: any, timeout: number, err?: boolean) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("finish work ", acc, timeout);

      if (!err) resolve(acc);
      else reject("ERROR");
    }, timeout);
  });
};

// const requests = [
//   resolveFunc(1, 100),
//   resolveFunc(2, 900),
//   resolveFunc(3, 800),
//   resolveFunc(4, 1500, true),
//   resolveFunc(5, 3500),
//   resolveFunc(6, 1500)
// ];

async function all<T extends Promise<any>[]>(promises: T) {
  return new Promise((resolve, reg) => {
    let complete = 0;
    const results = new Array(promises.length);

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((res) => {
          complete++;
          results[i] = res;

          if (complete === promises.length) {
            console.log("complete");

            resolve(res);
            results;
          }
        })
        .catch(reg);
    }
  });
}

// allSettled(requests).then((res) => console.log('res', res));

async function allSettled<T extends Promise<any>[]>(promises: T) {
  return new Promise((resolve) => {
    let complete = 0;
    const results = new Array(promises.length);

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((res) => {
          complete++;
          results[i] = res;

          if (complete === promises.length) {
            console.log("complete");

            resolve(results);
            results;
          }
        })
        .catch((err) => {
          complete++;
          results[i] = err;
        });
    }
  });
}

type MyEvent = string;
type Listener = (payload: any) => void;

class EventEmitter {
  #eventMap: Map<MyEvent, Set<(res: any) => void>>;
  constructor() {
    this.#eventMap = new Map();
  }

  on(event: MyEvent, listener: Listener) {
    if (this.#eventMap.has(event)) {
      this.#eventMap.get(event)?.add(listener);
    } else {
      this.#eventMap.set(event, new Set([listener]));
    }
  }

  fire(event: MyEvent, params: any) {
    if (!this.#eventMap.has(event)) {
      throw new Error("We doesnt have this event");
    }

    this.#eventMap.get(event)?.forEach((fn) => {
      fn(params);
    });
  }

  off(event: MyEvent, listener: Listener) {
    if (!this.#eventMap.has(event)) {
      throw new Error("We doesnt have this event");
    }

    const allFn = this.#eventMap.get(event);

    allFn?.forEach((listener_) => {
      if (listener_ === listener) {
        allFn.delete(listener_);
      }
    });
  }
}

async function runWithRetry(
  url: string = "https://jsonplaceholder.asda.com/postdss/1",
  retry: number = 1
) {
  console.log("retry ", retry);

  try {
    const res = await fetch(url);

    if (res.ok) {
      const body = await res.json();

      return body;
    }
  } catch (error) {
    if (retry !== 0) {
      console.log("run retry ");
      await resolveFunc(1, 1000);
      return await runWithRetry(url, retry - 1);
    } else {
      console.log("with Error ");
      throw error;
    }
  }
}

const br = {
  "[": "]",
  "<": ">",
  "(": ")",
  "{": "}",
};

const checkBrackets = (bracketsLine: string) => {
  const stack: string[] = [];

  const bracketsArr = Array.from(bracketsLine);

  const opened = Object.keys(br);
  const closed = Object.values(br);

  bracketsArr.forEach((bracket) => {
    // console.log(stack)
  });

  for (let bracket of bracketsArr) {
    if (opened.includes(bracket)) {
      stack.push(bracket);
    } else if (closed.includes(bracket) && br[stack?.at(-1)] === bracket) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length === 0;
};

// console.log(checkBrackets('[[((]]))'));
// console.log(checkBrackets('[)'));
// console.log(checkBrackets('))[[(<>)()]]'));
// console.log(checkBrackets('[[<<>>]](((([[]]))))'));
// console.log(checkBrackets('([])'));

const longArr1: number[] = [1, 4, 3, 2, 1, 5, 1, 123];
const longArr2: number[] = [1, 2];

function diff(arr1: number[], arr2: number[]): number[] {
  const set2 = new Set(arr2);
  return arr1.filter((x) => !set2.has(x));
}

// console.log(diff(longArr1, longArr2));

const findUnique = (array: any[]) => {
  const map = {};

  array.forEach((el) => {
    console.log(map, el);

    if (String(el) in map) {
      map[el]++;
    } else {
      map[el] = 0;
    }
  });

  const uniq = Object.entries(map).reduce((acc, [key, val]) => {
    if (val === 0) {
      acc.push(key);
    }
    return acc;
  }, []);

  return uniq;
};

// console.log(findUnique([2, 2, 1, 1, 3, 3, 5]));
// console.log(findUnique([5, 5, 5, 5, 1]));
// console.log(findUnique([2, 2, 2, 2]));

function twoSum(nums: number[], target: number) {}

console.log(twoSum([2, 7, 11, 5, 9, 10, 15], 26)); // Output: [0, 1]
console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Output: [1, 2]
console.log(twoSum([3, 3], 6)); // Output: [0, 1]

function getRanges(arr: number[]) {
  const sorted = [...arr].sort((a, b) => a - b);
  const ranges: string[] = [];

  let start = sorted[0];
  let prev = sorted[0];

  for (let i = 1; i <= sorted.length; i++) {
    const cur = sorted[i];

    if (cur === prev + 1) {
      prev = cur;
      continue;
    }

    // закрываем диапазон
    if (start === prev) {
      ranges.push(String(start));
    } else {
      ranges.push(`${start}-${prev}`);
    }

    // начинаем новый диапазон
    start = cur;
    prev = cur;
  }

  return ranges;
}

console.log(getRanges([1, 2, 5, 10, 9, 11, 6, 8, 0, 13, 16]));

const tree1 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 5,
      left: {
        val: 5,
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      val: 2,
      left: null,
      right: null,
    },
  },
  right: {
    val: 8,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: null,
  },
};

const tree2 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 5,
      left: {
        val: 5,
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 8,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: null,
  },
};

function isSameTree(left, right) {
  if (left?.val !== right?.val) {
    return false;
  }

  if (left === null && right === null) {
    return true;
  }

  if (left === null || right === null) {
    return false;
  }

  return (
    isSameTree(left.left, right.left) && isSameTree(left.right, right.right)
  );
}

// const isSame = isSameTree(tree1, tree2);
// console.log(isSame);

function evenBack(str: string) {
  const strToArr = str.split(" ");
  let wordCount = 1;

  function isWord(str: string): boolean {
    return /^[A-Za-zА-Яа-яЁё]+$/.test(str);
  }

  return strToArr
    .map((word, i) => {
      if (isWord(word)) {
        console.log(wordCount);

        if (wordCount % 2 === 0) {
          wordCount++;
          return word.split("").reverse().join("");
        }
        wordCount++;
        return word;
      }
      return word;
    })
    .join(" ");
}

console.log(evenBack("Look at the sky")); //
console.log(evenBack("21 plus 22 = sorok tri"));

// const findSubstring = (substribg, arr) => {

// };

// console.log(findSubstring('am', ['fuzzy', 'maskva', 'mama', 'search', 'algorithm', 'utility']));

const tree = {
  a: {
    b: 2,
    c: {
      d: 4,
    },
  },
};

interface Tree {
  [key: string]: number | Tree;
}

function printTreeVal(tree: Tree) {
  const result = {};

  const check = (tree: Tree, path: string = "") => {
    for (const key of Object.keys(tree)) {
      const value = tree[key];

      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
      ) {
        return check(tree, path + "." + key);
      }

      if (value) {
        const path_ = path + "." + key;

        result[path_] = value;
      }

      return;
    }
  };

  check(tree);

  return result;
}

console.log(printTreeVal(tree));
