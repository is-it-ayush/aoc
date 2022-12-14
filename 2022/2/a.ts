const a = await Deno.readTextFile("input.txt");
const input = a.trim().split("\r\n");

console.log("Answer:\t", solve(input));

function solve(x: string[]) {
    let my_score = 0;
    let pos = 0;
    while (pos < x.length) {
        // A is rock, B is paper, C is scissors
        // X is rock, Y is paper, Z is scissors

        let move = x[pos].split(" ");
        let round_score = calculate_initial_score(move[1]) as number;
        let draw_total = calculate_draw(move[0], move[1]) as number;
        if (did_win(move[0], move[1])) {
            round_score += 6;
        }
        my_score += (round_score + draw_total);
        pos++;
    }

    return my_score;
}

function calculate_draw(a: string, b: string) {
    if (a == "A" && b == "X" || a == "B" && b == "Y" || a == "C" && b == "Z") {
        return 3;
    }
    return 0;
}

function did_win(a: string, b: string) {

    if (a == "A" && b == "Y") {
        return true;
    } else if (a == "B" && b == "Z") {
        return true;
    } else if (a == "C" && b == "X") {
        return true;
    }
    return false;
}

function calculate_initial_score(x: string) {
    if (x == "X") {
        return 1;
    }
    if (x == "Y") {
        return 2;
    }
    if (x == "Z") {
        return 3;
    }
}


/**
 * --todo-- test the code below
 * x.reduce((acc, curr) => {
        const [move, opp] = curr.split(" ");
        if (move === opp) {
            return acc + 2;
        }
        if (move === "A" && opp === "Y" || move === "B" && opp === "Z" || move === "C" && opp === "X") {
            return acc + 6;
        }
        return acc;
    }, 0);
 */