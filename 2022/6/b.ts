const data = await Deno.readTextFile("input.txt");

console.log("Answer:\t" + solve(data));


function solve(data: string) {
    let index = 0, marker = 0;

    while (index < data.length) {
        if (index === 14) {  // First four characters; special check because we can't overflow the string length. In short, we don't check until we reach for characters because it doesnt make sense.
            if (!check_repeat(data.slice(0, 14))) {
                // // DEBUG
                // console.log(`Didn't repeat at index ${index} in ${data.slice(0, 14)}`);
                marker = 14;
                break;
            }
        }
        else if (index > 14) {
            if (!check_repeat(data.slice(index - 14, index))) {
                // // DEBUG
                // console.log(`Didn't repeat at index ${index} in ${data.slice(index - 14, index)}`);
                marker = index;
                break;
            }
        }
        index++;
    }

    return marker;
}

function check_repeat(x: string) {
    // mjqj = String is 14 characters long = x

    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x.length; j++) {
            if (i === j) continue;
            if (x[i] === x[j]) return true;
        }
    }
    return false;
}