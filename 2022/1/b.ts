// Input and Input Process
const input = await Deno.readTextFile("./input.txt");
const splitInput = input.trim().split("\r\n\r\n");

// Call & Output
console.log("Sum (First Three): ", calculate_most_calories(splitInput))

// Calculate
function calculate_most_calories(x: string[]): number {
    let pos = 0, first_three_sum = 0;
    let all_max: number[] = [];
    while (pos < x.length) {
        const lineSum = sum_line(x[pos]);
        all_max.push(lineSum);
        pos++;
    }
    all_max = all_max.sort((n1, n2) => n1 < n2 ? 1 : -1)
    first_three_sum = all_max[0] + all_max[1] + all_max[2];
    return first_three_sum;
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