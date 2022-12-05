const i = await Deno.readTextFile("input.txt");
const input = i.trim().split("\r\n");

console.log("Answer:\t", solve(input));

function solve(x: string[]) {
    let pos = 0, sum = 0;

    while (pos < x.length) {
        // 2-4, 6-8
        // 6-6, 4-6
        const [range1, range2] = x[pos].split(",");
        const [a, b] = range1.split("-").map(Number);
        const [c, d] = range2.split("-").map(Number);

        if (a >= c && b <= d) {
            sum++;
        }
        else if (c >= a && d <= b) {
            sum++;
        }
        pos++;
    }

    return sum;
}