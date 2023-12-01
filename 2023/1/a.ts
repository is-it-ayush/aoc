
// Input and Input Process
const input = await(Bun.file("./2023/1/input.txt")).text();
const splitInput = input.trim().split("\n");

// ab1cd2ef = len: 8, mid: 4
// ab1cd2efg  = len: 9, mid: 5
// -->   <--
// mid = Math.floor(line.length + 1 / 2);
let sum = 0;
for (const line of splitInput) {
  let extractedNumberString = "";
  for (let i = 0; i < line.length; i++) {
    let char = line.charAt(i);
    // exploiting the fact that characters aren't used. (should be an easy fix, just check for charCode)...
    if (!isAlpha(char)) {
      extractedNumberString += parseInt(char).toString();
    }
  }

  if (extractedNumberString.length === 0) continue;

  let extractedNumber = Number(extractedNumberString);
  let firstLast = extractedNumberString[0].concat(extractedNumberString[extractedNumber < 10 ? 0 : extractedNumberString.length - 1]);
  console.log(`Line: ${line} | NString: ${extractedNumberString} | N: ${extractedNumber} | Adding: ${firstLast}`);
  sum += Number(firstLast);
}

function isAlpha(code: string): boolean {
  return code.toUpperCase() !== code.toLowerCase();
}

console.log(`Sum: ${sum}`);
