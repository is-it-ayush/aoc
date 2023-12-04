// input and input process;
const input = await(Bun.file(`./2023/${process.env.AOC_DAY}/input.txt`)).text();
const lines = input.trim().split("\n");

let sum = 0;
for (let line of lines) {
  line = line.replaceAll("Card", "").trim();
  let [id, numbers] = line.split(":").map((e) => e.trim());
  let [winningNumbers, ourNumbers] = numbers.split("|").map((e) => e.trim().split(" "));
  console.log(`CardID: ${id} | WinningNumbers: ${winningNumbers} | OurNumbers: ${ourNumbers}`);
  let lineSum = 0;
  for (let number of ourNumbers) {
    if (number === "") continue;
    if (winningNumbers.includes(number)) {
        lineSum += lineSum === 0 ? 1 : lineSum;
    }
  }
  console.log(`CardID: ${id} | Adding ${lineSum} to ${sum}`);
  sum += lineSum
}

console.log(`Sum: ${sum}`);
