// input and input process;
const input = await(Bun.file(`./2023/${process.env.AOC_DAY}/input.txt`)).text();
const lines = input.trim().split("\n");

function distanceTravelled(speed: number, time: number): number {
  return speed * time;
}
function hasWon(calculatedDistance: number, givenDistance: number): boolean {
  return calculatedDistance > givenDistance;
}

const givenTime = Number(lines[0].split(":")[1].trim().replaceAll(" ", ""));
const givenDistance = Number(lines[1].split(":")[1].trim().replaceAll(" ", ""));
console.log(`Case Time: ${givenTime} | Case Distance: ${givenDistance}`);

let time = givenTime;
let speed = 0;
let winCount = 0;
for (let j = 0; j <= givenTime; ++j) {
  const travalled = distanceTravelled(speed, time);
  const canWin = hasWon(travalled, givenDistance);
  // console.log(`  - Time Now: ${time} | Calculated Speed: ${speed} | Calculated Distance: ${travalled} | Win: ${canWin}`);
  if (canWin) {
    ++winCount;
  }
  ++speed;
  --time;
}

console.log(`Result: ${winCount}`);
