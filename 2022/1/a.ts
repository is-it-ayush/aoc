const input = await Deno.readTextFile("./input.txt");
const splitInput = input.trim().split("\r\n\r\n");
console.log("Max: ", calculate_most_calories(splitInput))
function calculate_most_calories(x: string[]): number {
    let ipos = 0, max_index = 0, max = 0;
    while (ipos < x.length) {
        let lineSum = sum_line(x[ipos]);
        if (lineSum > max) {
            max_index = ipos;
            max = lineSum;
        }
        ipos++;
    }

    return max;
}

function sum_line(x: string) {
    x = x.replaceAll("\r\n", " ");
    const numStr = x.split(" ");
    let sum = 0;
    for (let i = 0; i < numStr.length; i++) {
        sum += parseInt(numStr[i]);
    }
    return sum;
}