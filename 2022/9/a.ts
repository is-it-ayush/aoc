const data = await Deno.readTextFile("input.txt");
const input = data.split("\r\n");

console.log("Answer:\t", solve(input));

// Assume the head and the tail both start at the same position, overlapping.
// Start: Overlap (H=T)
// Condition 1: the head (H) and tail (T) must always be touching (diagonally adjacent and even overlapping both count as touching)
// Condition 2: If the head is ever two steps directly up, down, left, or right from the tail, the tail must also move one step in that direction so it remains close enough
// Condition 3: If the head is ever two steps diagonally from the tail, the tail must also move one step diagonally so it remains close enough

type cords = {
    x: number;
    y: number;
}

function solve(input: string[]) {
    let pos = 0, count = 0;

    let head: cords = { x: 0, y: 0 };
    let tail: cords = { x: 0, y: 0 };

    while (pos < input.length) {
        const line = input[pos];
        const dir = line.charAt(0);
        const steps = parseInt(line.substring(1));

        move(head, dir, steps);

        // After moving the head, check if the tail needs to move

        if (calculate_distance(head, tail) >= 2) {
            // Condition 2
            if (diagonally_adjacent(head, tail)) {
                // Condition 3
                move(tail, dir, 1);
            } else {
                // Condition 2
                move(tail, dir, 1, true);
            }
        }


        // console.log(`Head: ${head.x}, ${head.y}\tTail: ${tail.x}, ${tail.y}`);
        print_grid(head, tail);
        pos++;
    }

    return count;
}

function print_grid(cord1: cords, cord2: cords) {
    let grid = '';
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            if (x === cord1.x && y === cord1.y) {
                grid += 'H';
            } else if (x === cord2.x && y === cord2.y) {
                grid += 'T';
            } else {
                grid += '.';
            }
        }
        grid += '\r\n';
    }
    console.log(grid);
}

function calculate_distance(cords1: cords, cords2: cords) {
    return Math.abs(cords1.x - cords2.x) + Math.abs(cords1.y - cords2.y);
}

function diagonally_adjacent(cords1: cords, cords2: cords) {
    return Math.abs(cords1.x - cords2.x) <= 1 && Math.abs(cords1.y - cords2.y) <= 1;
}

function overlapping(cords1: cords, cords2: cords) {
    return cords1.x === cords2.x && cords1.y === cords2.y;
}


function move(cords: cords, dir: string, steps: number, only_y: boolean = false) {
    switch (dir) {
        case 'U':
            cords.y += steps;
            break;
        case 'D':
            if (only_y) {
                cords.y -= steps;
            }
            break;
        case 'L':
            if (only_y) {
                cords.x -= steps;
            }
            break;
        case 'R':
            cords.x += steps;
            break;
    }


}