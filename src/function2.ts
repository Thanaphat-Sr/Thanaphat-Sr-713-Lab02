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


// Function to find the maximum value in a list of numbers
export function findMaxInList(numbers: number[]): string {
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
