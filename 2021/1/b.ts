/**
 * Advent Of Code: Day 1: Statement 2
 * @year 2021
 * @author Ayush Gupta
 * @github is-it-ayush
 */


const input = await Deno.readTextFile("./input.txt");

// Mimic Input
// const input = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263"

// Process Input (Split by NewLine)
const splitInput = input.split("\n");

// Calc Depth.
let result = calculate_depth_measure(splitInput);
console.log("Total Depth:\t", result);

function calculate_depth_measure(x: string[]): number {
    let pos = 0, counter = 0;
    while (pos < x.length) {
        let n1 = parse_and_add(x[pos], x[pos + 1], x[pos + 2]);    // Can be NaN
        let n2 = parse_and_add(x[pos + 1], x[pos + 2], x[pos + 3]); // Can be NaN
        if (n1 && n2) { // NaN Check
            if (n2 > n1) counter++;
        }
        pos++; // Update while loop
    }
    return counter;
}

function parse_and_add(a: string, b: string, c: string): number {
    return parseInt(a) + parseInt(b) + parseInt(c);
}