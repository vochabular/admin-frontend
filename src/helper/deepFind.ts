function findRecursive(input: object, searchValue: string): any | null {
  let result = null;
  if (input instanceof Array) {
    for (let i = 0; i < input.length; i++) {
      result = findRecursive(input[i], searchValue);
      if (result) {
        break;
      }
    }
  } else {
    for (const prop in input) {
      if (prop === "id") {
        if (input[prop as keyof object] === searchValue) {
          return input;
        }
      }
      // @ts-ignore
      if (input[prop] instanceof Object || input[prop] instanceof Array) {
        result = findRecursive(input[prop as keyof object], searchValue);
        if (result) {
          break;
        }
      }
    }
  }
  return result;
}

export function deepFind(input: object, searchValue: string): object | null {
  return findRecursive(input, searchValue);
}
