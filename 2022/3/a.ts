const i = await Deno.readTextFile("input.txt");
const input = i.trim().split("\r\n");

const lowerPriority = 'abcdefghijklmnopqrstuvwxyz';
const upperPriority = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

console.log("Answer:\t", solve(input));

function solve(x: string[]) {
    let pos = 0, priority_sum = 0;
    while (pos < x.length) {
        // Divide the string into two parts
        const a = x[pos].slice(0, x[pos].length / 2);
        const b = x[pos].slice(x[pos].length / 2);

        // Find the common character's and calcualte their priority sum
        let letter = '';
        for (let i = 0; i < a.length; i++) {
            if (b.includes(a[i]) && !letter.includes(a[i])) {
                letter += a[i];
            }
        }
        if (lowerPriority.includes(letter)) {
            priority_sum += lowerPriority.indexOf(letter) + 1;
        } else {
            priority_sum += upperPriority.indexOf(letter) + 27;
        }
        pos++;
    }
    return priority_sum;
}