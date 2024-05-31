const isPalindrome = (str: string) => {
  const regExp = /\*|%|#|&|\$/g;
  const formattedStr = str.toLocaleLowerCase().replaceAll(' ', '')
  console.log('formattedStr', formattedStr);
  
  let countLeftLink = 0
  let countRightLink = formattedStr.length - 1

  let leftLink = formattedStr[0]
  let rightLink = formattedStr[countRightLink]

  let res;

  while (true) {
    if (countLeftLink === countRightLink) {
      break
    }
    console.log('leftLink', leftLink);
    console.log('rightLink', rightLink);
    
    if (leftLink === rightLink) {
      leftLink = formattedStr[++countLeftLink]
      rightLink = formattedStr[--countRightLink]
    
      continue
    } else {
      res = false
      return res
    }
    
    
  }

  return true
}

console.log(isPalindrome("Was it a car or a cat I saw"))
console.log(isPalindrome("tab a cat"))
