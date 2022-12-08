const data = await Deno.readTextFile("input.txt");
const input = data.split("\r\n");

// Appending the change directory command to the end of the input array to make the code simpler
input.push("$ cd ..");
let sum = 0;
console.log("Answer:\t" + solve(input));


interface Directory {
    name: string;
    size: number;
    parent: Directory | null;
    children: Directory[];
}

function solve(input: string[]): number {

    let pos = 0, root: Directory = { name: "", size: 0, parent: null, children: [] }, current_dir: Directory = root;

    while (pos < input.length) {

        const line = input[pos];
        if (line.startsWith("$ cd")) {
            const command = line.slice(2, line.length).split(" ");
            if (command[1] === "..") {
                current_dir = current_dir.parent!;

                // Sum all the childern of the current directory
                let sum = 0;
                for (let i = 0; i < current_dir.children.length; i++) {
                    sum += current_dir.children[i].size;
                }
                current_dir.size += sum; // Update the parent directory size with the sum of the children size.
            }
            else if (command[0] === "cd" && command[1] !== "/") {
                const new_dir: Directory = { name: command[1], size: 0, parent: current_dir, children: [] };

                current_dir.children.push(new_dir);
                current_dir = new_dir;
            }
        }
        else if (!line.startsWith("$ ls")) {
            let size = parseInt(line.slice(0, line.indexOf(" ")));
            if (!isNaN(size)) {
                current_dir.size += size;
            }
        }
        pos++;
    }


    let sum = sum_all_children(root);
    // Use recursion to sum all the children of the root directory and sub directories

    return sum;
}

function sum_all_children(dir: Directory): number {
    sum += dir.size < 100000 ? dir.size : 0;

    if (dir.children.length > 0) {
        dir.children.forEach(child => {
            sum_all_children(child);
        });
    }
    else {
        return dir.size < 100000 ? dir.size : 0;
    }
    return sum;
}

/**
 * Example Output: 95437
 * Puzzle Ouput: Wrong Answer
 * Reason: I'm not sure why it's wrong, I've tried to debug it but I can't find the problem. I'm dropping this puzzle for now.
 */