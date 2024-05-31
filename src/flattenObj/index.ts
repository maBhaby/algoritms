import { Indexed } from "src/types/common";

/*
Задача: Напишите функцию flattenObject(obj), которая принимает в качестве
аргумента вложенный объект obj и возвращает новый объект,
в котором все свойства объекта obj "разглажены"
(преобразованы в одноуровневую структуру), с использованием точечной нотации
для представления иерархии свойств.
*/

const obj = {
  a: {
    b: {
      c: 1,
      d: 2
    },
    e: 3
  },
  f: 4
};

const flattenObject = (obj: Indexed) => {
  const res: Indexed = {}

  const stackTree = [{node: obj, prefix: ''}]

  while (stackTree.length) {
    const stackEl = stackTree.shift()
    
    if (stackEl === undefined) break

    const {node, prefix} = stackEl
    
    for (let key in node) {
      const currentElNode = node[key]
      const newKey = prefix + key
      if (isObject(currentElNode)) {
        stackTree.unshift({node: currentElNode, prefix: newKey + '.'})
      } else {
        res[newKey] = currentElNode
      }
    }
  }

  return res
}

const flattenedObj = flattenObject(obj);
console.log(flattenedObj);
// Ожидаемый результат: { 'a.b.c': 1, 'a.b.d': 2, 'a.e': 3, 'f': 4 } || { "f": 4, "a.e": 3, "a.b.c": 1, "a.b.d": 2 }

function isObject(arg: unknown): arg is {} {
  return typeof arg === 'object' && arg !== null && !Array.isArray(arg)
}
