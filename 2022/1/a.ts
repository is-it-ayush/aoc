// Input and Input Process
const input = await Deno.readTextFile("./input.txt");
const splitInput = input.trim().split("\r\n\r\n");

// Call & Output
console.log("Max: ", calculate_most_calories(splitInput))

// Calculate
function calculate_most_calories(x: string[]): number {
    let ipos = 0, max = 0;
    while (ipos < x.length) {
        const lineSum = sum_line(x[ipos]);
        if (lineSum > max) {
            max = lineSum;
        }
        ipos++;
    }

    return max;
}

// Return sum of all the numbers in line Separated by Whitespace.
function sum_line(x: string) {
    x = x.replaceAll("\r\n", " ");
    const numStr = x.split(" ");
    let sum = 0;
    for (let i = 0; i < numStr.length; i++) {
        sum += parseInt(numStr[i]);
    }
    return sum;
}