/**
 * Advent Of Code: Day 1: Statement 1
 * @year 2021
 * @author Ayush Gupta
 * @github is-it-ayush
 */

const input = await Deno.readTextFile("./input.txt");
const splitInput = input.split("\n");

console.log(calculate_depth_measure(splitInput));


function calculate_depth_measure(x: string[]) {
    let counter = 0, pos = 0;

    while (pos < x.length) {
        let n1 = parseInt(x[pos]);
        let n2 = parseInt(x[pos + 1]);
        if (n1 < n2) counter++;
        pos++;
    }

    return counter;
}