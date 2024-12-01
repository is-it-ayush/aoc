// input and input process;
const input = await(Bun.file(`./2023/${process.env.AOC_DAY}/input.txt`)).text();
const lines = input.trim().split("\n");

// Time:      7  15   30
// Distance:  9  40  200
//
// goal: find the number of ways you can win for each race.
// approach: if you don't move and keep subtracting from time.
// you'll get your speed and then using the leftover time, you
// can calculate distance. if that calculated distance is >=distance
// mentioned increment a counter. finally before moving onto the
// next race, store that counter in a tracker array.

function distanceTravelled(speed: number, time: number): number {
  return speed * time;
}

function hasWon(calculatedDistance: number, givenDistance: number): boolean {
  return calculatedDistance > givenDistance;
}

const givenTime = lines[0].split(":")[1].trim().split(" ").filter((e) => e.length !== 0).map(Number);
const givenDistance = lines[1].split(":")[1].trim().split(" ").filter((e) => e.length !== 0).map(Number);
let trackerArray = Array.from<number>({ length: givenTime.length });
trackerArray.fill(0);
// console.log(givenTime, givenDistance, trackerArray);

for (let i = 0; i < givenTime.length; ++i) {
  let time = givenTime[i];
  let distance = givenDistance[i];
  let speed = 0;
  let winCount = 0;

  // console.log(`Case Time: ${time} | Case Distance: ${distance}`);

  for (let j = 0; j <= givenTime[i]; ++j) {
    const travalled = distanceTravelled(speed, time);
    const canWin = hasWon(travalled, distance);
    // console.log(`  - Time Now: ${time} | Calculated Speed: ${speed} | Calculated Distance: ${travalled} | Win: ${canWin}`);
    if (canWin) {
      ++winCount;
    }
    ++speed;
    --time;
  }
  trackerArray[i] = winCount;
  // console.log("----------");
}

const result = trackerArray.reduce((acc, item, idx) => {
  if (item !== 0) {
    acc *= item;
  }
  return acc;
}, 1);

console.log(`Result: ${result}`);
