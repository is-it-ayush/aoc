const input = await Deno.readTextFile("./input.txt");
const splitInput = input.trim().split("\r\n\r\n");
console.log("Max: ", calculate_most_calories(splitInput))


function calculate_most_calories(x: string[]): number {
    let ipos = 0, first_three_sum = 0, max = 0;
    let all_max: number[] = [];
    while (ipos < x.length) {
        let lineSum = sum_line(x[ipos]);
        all_max.push(lineSum);
        ipos++;
    }
    all_max = all_max.sort((n1, n2) => n1 < n2 ? 1 : -1)
    first_three_sum = all_max[0] + all_max[1] + all_max[2];
    console.log(first_three_sum)
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