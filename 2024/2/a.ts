let num_list: number[][] = [];

await(Bun.file("./2024/2/input.txt")).text().then((input: string) => {
  input.trim().split("\n").forEach((line: string) => {
    let t_list: number[] = line.split(" ").map((x) => parseInt(x));
    num_list.push(t_list);
  });
});

type Order = "asc" | "desc" | null;
let safe = 0;

num_list: for (let i = 0; i < num_list.length; i++) {
  const t_list = num_list[i];
  let order: Order = null;
  for (let j = 0; j < t_list.length; j++) {
    if (j + 1 === t_list.length) break;
    const diff = t_list[j + 1] - t_list[j];
    let l_order: Order = diff > 0 ? "asc" : "desc";

    if(order !== null && order !== l_order) { // order mismatch
      continue num_list;
    }
    if(Math.abs(diff) < 1 || Math.abs(diff) > 3) { // diff < 1 || diff > 3
      continue num_list;
    }
    order = l_order;
  }
  safe++;
}

console.log(safe);
