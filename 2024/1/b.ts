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

let sim_score = 0;
for(let i = 0; i < list_a.length; i++) {
  const num_to_check = list_a[i];
  const occurances = list_b.filter((x) => x === num_to_check).length;
  sim_score += (num_to_check * occurances);
}

console.log(`SimScore: ${sim_score}`);
