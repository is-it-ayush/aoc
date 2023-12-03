// input and input process;
const input = await(Bun.file(`./2023/${process.env.AOC_DAY}/input.txt`)).text();
const lines = input.trim().split("\n");

/// problem breakdown;
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// if total red <= 12 && total green <= 13 && total blue <= 14 then sum game id
// need to extract 3, 8 green, 6 blue, 20 red, 5 blue, 4 red, 13 green and

const RED_MAX = 12;
const GREEN_MAX = 13;
const BLUE_MAX = 14;
type BallColors = "R" | "G" | "B";
let gameIDSum = 0;
// iterate over line;
for (let line of lines) {
  line = line.replaceAll("red", "R").replaceAll("green", "G").replaceAll("blue", "B").replaceAll("Game", "").trim();
  const [id, ...values] = line.split(":").map(e => e.trim());
  const gameID = Number(parseInt(id));
  const gameSets = values.join("").split(";");
  let illegalGame = false;

  // iterate over all game sets;
  setLoop: for (let set of gameSets) {
    let setValue = set.replaceAll(" ", "").split(",").map((e) => e.trim()); // we only have idx 0 and idx 1 filled.
    caseLoop: for (let setCase of setValue) {
      // console.log(`Debugging Set Value: ${setCase}`);
      const ballCount = Number(parseInt(setCase));
      const ballType = setCase[setCase.length - 1] as BallColors;
      // console.log(`ballCount: ${ballCount} | ballType: ${ballType}`)
      switch (ballType) {
        case "R":
          if (ballCount > RED_MAX) {
            illegalGame = true;
            break setLoop;
          }
          break;
        case "G":
          if (ballCount > GREEN_MAX) {
            illegalGame = true;
            break setLoop;
          }
          break;
        case "B":
          if (ballCount > BLUE_MAX) {
            illegalGame = true;
            break setLoop;
          }
          break;
      }
    }
  }

  if (illegalGame == false) {
    // console.log(`${gameID} is possible: Adding ${gameIDSum} to ${gameIDSum}`);
    gameIDSum += gameID;
  }
}
console.log(`Sum Of Ids: ${gameIDSum}`)
