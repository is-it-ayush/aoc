const a = await Deno.readTextFile("input.txt");
const input = a.trim().split("\r\n");

console.log("Answer:\t", solve(input));

function solve(x: string[]) {
    let my_score = 0;
    let pos = 0;
    while (pos < x.length) {
        // A is rock, B is paper, C is scissors
        // X is rock, Y is paper, Z is scissors

        // X = LOSE, Y = DRAW, Z = WIN

        const move = x[pos].split(" ");
        let round_score = getScore(move[0], move[1]) as number;
        console.log("Round score:\t", round_score);
        my_score += round_score;
        pos++;
    }
    return my_score;
}

function getScore(opponent: string, outcome: string) {
    const moves = {
      "A": "X", // Rock
      "B": "Y", // Paper
      "C": "Z", // Scissors
    };
    const scores = {
      "Z": 6, // Win
      "Y": 3, // Draw
      "X": 0, // Loss
    };
  
    return scores[outcome];
  }