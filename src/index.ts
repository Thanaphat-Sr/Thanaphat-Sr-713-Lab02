import add, { subtract } from './funtions';
import { findMaxInList } from './function2';

const result = add(1, 2) + 0;
const result2 = subtract(1, 2) + 0;
console.log(result, 'type of result:', typeof result);
console.log(result2, 'type of result2:', typeof result2);

// Example usage of findMaxInList
const numbers = [2, 4, 6, 8, 10];
console.log(`The maximum value is: ${findMaxInList(numbers)}`);