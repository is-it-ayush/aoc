const i = await Deno.readTextFile("input.txt");
const input = i.trim().split("\r\n");

const lowerPriority = 'abcdefghijklmnopqrstuvwxyz';
const upperPriority = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

console.log("Answer:\t", solve(input));

function solve(x: string[]) {
    let pos = 0, priority_sum = 0;
    while (pos < x.length) {
        let common_letter = '';
        for (let i = 0; i < x[pos].length; i++) {
            if (x[pos + 1].includes(x[pos][i]) && x[pos + 2].includes(x[pos][i]) && !common_letter.includes(x[pos][i])) {
                common_letter += x[pos][i];
            }
        }

        if (lowerPriority.includes(common_letter)) {
            priority_sum += lowerPriority.indexOf(common_letter) + 1;
        } else {
            priority_sum += upperPriority.indexOf(common_letter) + 27;
        }
        pos += 3;
    }
    return priority_sum;
}