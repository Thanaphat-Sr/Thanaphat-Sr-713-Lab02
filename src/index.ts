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
