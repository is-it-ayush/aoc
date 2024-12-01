let list_a: number[] = [];
let list_b: number[] = [];

await(Bun.file("./2024/1/input.txt")).text().then((input: string) => {
  input.trim().split("\n").forEach((line: string) => {
    // 1   2
    let split = line.split(" ").filter((x) => x !== "");
    list_a.push(Number(split[0].trim()));
    list_b.push(Number(split[1].trim()));
  });
});

if(list_a.length !== list_b.length) {
  throw new Error("The lists gotta be equal. (length mismatch)");
}

// sort the lists
list_a.sort((a, b) => a - b);
list_b.sort((a, b) => a - b);

let sum = 0;
for(let i = 0; i < list_a.length; i++) {
  sum += Math.abs(list_a[i] - list_b[i]);
}

console.log(`Sum: ${sum}`);
