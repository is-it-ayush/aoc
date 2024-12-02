/**
  * Well uh it works for example input.
  * I'm not debugging the whole puzzle input.
  *
  */

let num_list: number[][] = [];

await(Bun.file("./2024/2/input.txt")).text().then((input: string) => {
  input.trim().split("\n").forEach((line: string) => {
    let t_list: number[] = line.split(" ").map((x) => parseInt(x));
    num_list.push(t_list);
  });
});

let safe_counter = 0;
for (let i = 0; i < num_list.length; i++) {
  let t_list = num_list[i];
  let t_safety = isListSafe(t_list);
  if(!t_safety.safe) {
    t_safety = isListSafe(t_list.filter((_val, idx) => t_safety.index !== idx));
  }
  if(t_safety.safe) {
    safe_counter++;
  }
}

type Order = "asc" | "desc" | null;
function isListSafe(t_list: number[]): {
  safe: boolean;
  index: number;
} {
  let order: Order = null;
  for (let j = 0; j < t_list.length; j++) {
    if (j + 1 === t_list.length) break;
    const diff = t_list[j + 1] - t_list[j];
    let l_order: Order = diff > 0 ? "asc" : "desc";

    // (diff < 1 || diff > 3) || (order != l_order)
    if((Math.abs(diff) < 1 || Math.abs(diff) > 3) || (order !== null && order !== l_order)) {
      return {
        safe: false,
        index: j,
      };
    }
    order = l_order;
  }
  return {
    safe: true,
    index: -1,
  };
}

console.log(safe_counter);
