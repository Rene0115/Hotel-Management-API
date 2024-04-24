export const convertArrayToString = (array: Array<any>) => {
    if (Array.isArray(array)) {
      if (array.length === 1) {
        return array[0];
      } else {
        return array.join(", ");
      }
    } else {
      return "Input is not an array.";
    }
  };
  
  export function showObjectProperties(obj: Record<string, any>): void {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        console.log(`Key: ${key}, Value: ${obj[key]}`);
      }
    }
  }
  
  export const sumArray = (values: number[]): number => {
    let sum = 0;
    for (const value of values) {
      sum += value;
    }
    return sum;
  };