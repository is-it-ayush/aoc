const data = await Deno.readTextFile("input.txt");
const input: string[] = data.split("\r\n");

let visible = ((input.length - 1) * (input[0].length - 1));
console.log(`Answer:\t${solve(input)}`);

function solve(input: string[]): number {

    let row = 1, col = 1, maxRowLength = input.length, maxColLength = input[0].length;

    for (let i = row; i < input.length - 1; i++) {
        // Row 1 , 2 , 3
        for (let j = col; j < input[i].length - 1; j++) {
            // Col 1, 2, 3
            // Up would be: row - 1, col
            // Down would be: row + 1, col
            // Left would be: row, col - 1
            // Right would be: row, col + 1
            let target = input[i][j];
            if (target > input[row - 1][col] || target > input[row + 1][col] || target > input[row][col - 1] || target > input[row][col + 1]) {
                visible++;
            }
        }

        /**
         * I dont need to check edges, i.e. anything that is 0 or 4 in the array
         *         0 1 2 3 4
         * Line  0 3 0 3 7 3
         * Line  1 2 v v x 2   5 5 1
         * Line  2 6 v x v 2   5 3 3
         * Line  3 3 x v x 9   3 5 4
         * Line  4 3 5 3 9 0
          
                   0 1 2 3 4
         * Line  0 3 0 3 7 3
         * Line  1 2 5 5 1 2
         * Line  2 6 5 3 3 2
         * Line  3 3 3 5 4 9
         * Line  4 3 5 3 9 0
         * 
         */

        return visible;
    }
}
