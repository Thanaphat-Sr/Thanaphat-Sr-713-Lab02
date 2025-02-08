console.log("Hello, TypeScript with Node.js!");

let x:number | string = 10;
x = 2;
if (typeof x === 'string') {
   console.log('x is a string');
}else if (typeof x === 'number') {
   console.log('x is a number');
}else {
   console.log('x is neither a string nor a number');
}

 const add = (a:number,b:number):string => {
    const result =  a+b;
    return result.toString();
 }

 function findMax(numbers: number[]): string {
    if (numbers.length === 0) {
        return "List is empty";
    }
    let maxNumber = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > maxNumber) {
            maxNumber = numbers[i];
        }
    }
    return maxNumber.toString();
}
// Example usage
const numbers: number[] = [1, 2, 3, 4, 5];
console.log(`The maximum value is: ${findMax(numbers)}`);
