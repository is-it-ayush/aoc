// input and input process;
const input = await(Bun.file(`./2023/${process.env.AOC_DAY}/input.txt`)).text();
const lines = input.trim().split("\n");

type BallColors = "R" | "G" | "B";
let ballPower = 0;
// iterate over line;
for (let line of lines) {
  line = line.replaceAll("red", "R").replaceAll("green", "G").replaceAll("blue", "B").replaceAll("Game", "").trim();
  const [id, ...values] = line.split(":").map(e => e.trim());
  const gameID = Number(parseInt(id));
  const gameSets = values.join("").split(";");

  let last_blue = 0, last_green = 0, last_red = 0;

  // iterate over all game sets;
  for (let set of gameSets) {
    let setValue = set.replaceAll(" ", "").split(",").map((e) => e.trim());
    for (let setCase of setValue) {
      // console.log(`Debugging Set Value: ${setCase}`);
      const ballCount = Number(parseInt(setCase));
      const ballType = setCase[setCase.length - 1] as BallColors;
      // console.log(`ballCount: ${ballCount} | ballType: ${ballType}`)
      switch (ballType) {
        case "R":
          last_red = Math.max(ballCount, last_red);
          break;
        case "G":
          last_green = Math.max(ballCount, last_green);
          break;
        case "B":
          last_blue = Math.max(ballCount, last_blue);
          break;
      }
    }
  }

  // console.log(`${gameID}: ballPower += (${last_red} * ${last_green} * ${last_blue})`);
  ballPower += last_red * last_green * last_blue;
}
console.log(`BallPower: ${ballPower}`)
