// input and input process;
const input = await(Bun.file(`./2023/${process.env.AOC_DAY}/input.txt`)).text();
const lines = input.trim().split("\n");

let trackerArray: number[] = Array.from({ length: lines.length });
trackerArray.fill(0);
for (let line of lines) {
  line = line.replaceAll("Card", "").trim();
  let [id, numbers] = line.split(":").map((e) => e.trim());
  let [winningNumbers, ourNumbers] = numbers.split("|").map((e) => e.trim().split(" "));
  let cardID = Number(parseInt(id));
  let wonCount = 0;
  for (let number of ourNumbers) {
    if (number === "") continue;
    if (winningNumbers.includes(number)) {
      ++wonCount;
    }
  }
  // console.log(`CardID: ${id} | WinningNumbers: ${winningNumbers} | OurNumbers: ${ourNumbers}`);
  // console.log(`CardID: ${id} | WonCount: ${wonCount}`);

  const trackerCardIndex = cardID - 1;
  // real append
    trackerArray[trackerCardIndex] += 1;
  const trackerCardValue = trackerArray[trackerCardIndex];
  // copy append
  for (let j = 1; j <= trackerCardValue; j++) {
    for (let i = 1; i <= wonCount; i++) {
      // console.log(`CardId: ${cardID} | TrackerIndex: ${trackerCardIndex} | trackerCardValue: ${trackerArray[trackerCardIndex]} | IncrementingTrackerIndex: ${trackerCardIndex + i} i.e. CardId: ${cardID + i}`)
      trackerArray[trackerCardIndex + i] += 1;
    }
  }
  // console.log(trackerArray);
}
console.log(`Sum: ${trackerArray.reduce((acc, item) => {
  acc += item;
  return acc;
}, 0)}`);
