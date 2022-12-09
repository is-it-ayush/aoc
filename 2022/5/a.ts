const i = await Deno.readTextFile("input.txt");
const [crates, moves] = i.split("\r\n\r\n");

console.log("Answer:\t", solve(crates, moves));

function solve(input: string, moves: string) {
    let soln: string = ""

    const horizontal = input.split("\n").map((l) =>
        l.split("").filter((_, i) => i % 4 === 1)
    );
    horizontal.pop(); // remove numbers at the end

    console.log(horizontal);
    const stacks: string[][] = [];
    horizontal.reverse().forEach((h) => {
        h.forEach((c, i) => {
            if (stacks[i] === undefined) stacks[i] = [];
            stacks[i].push(c);
        });
    });

    

    return soln;
}