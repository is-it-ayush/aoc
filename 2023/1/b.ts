
// Input and Input Process
const input = await(Bun.file("./2023/1/input.txt")).text();
const splitInput = input.trim().split("\n");

// FUCK THIS SHIT I GIVE UP (FOR NOW)

const allowedDigits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"] as const;
const digitMap: Record<typeof allowedDigits[number], string> = {
  "one": '1',
  "two": '2',
  "three": '3',
  "four": '4',
  "five": '5',
  "six": '6',
  "seven": '7',
  "eight": '8',
  "nine": '9'
}

// ab1twocd2threef = len: 15,
// ab1cdthree2efg  = len: 14,
// eightwothree = what the fuck
let sum = 0;
for (const line of splitInput) {
  let extractedNumberString = "";
  let holdMyLetters = "";
  for (let i = 0; i < line.length; i++) {
    let char = line.charAt(i);
    if (!isAlpha(char)) {
      extractedNumberString += char;
    } else {
      holdMyLetters += char;
      allowedDigits.forEach((d) => {
        if (holdMyLetters.includes(d)) {
          extractedNumberString += digitMap[d];
          holdMyLetters = holdMyLetters.substring(0, holdMyLetters.length - 2);
        }
      });
    }
  }

  if (extractedNumberString.length === 0) continue;
  let extractedNumber = Number(extractedNumberString);
  if (extractedNumber < 10) {
    sum += extractedNumber;
  }
  else {
    let firstLast = extractedNumberString[0].concat(extractedNumberString[extractedNumberString.length - 1]);
    sum += Number(firstLast);
  }
  console.log(`Line: ${line} | NString: ${extractedNumberString} | N: ${extractedNumber}`);
}

console.log(`Sum: ${sum}`);

function isAlpha(code: string): boolean {
  return code.toUpperCase() !== code.toLowerCase();
}

