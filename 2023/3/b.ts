// input and input process;
const input = await(Bun.file(`./2023/${process.env.AOC_DAY}/input.txt`)).text();
const lines = input.trim().split("\n");

type NumberValue = { startIdx: number; endIdx: number; value: number };
function parseLine(line: string): NumberValue[] {
  let numbersFound: NumberValue[] = [];

  let temporaryNumberString = "", temporaryStartIdx = null, temporaryEndIdx = null;
  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i);
    if (isDigit(char)) {
      if (!temporaryStartIdx) {
        temporaryStartIdx = i;
      }

      temporaryNumberString += char;

      if (!temporaryEndIdx && !isDigit(line.charAt(i + 1))) {
        temporaryEndIdx = i;
      }

      if (temporaryEndIdx && temporaryStartIdx && temporaryNumberString.length > 0) {
        numbersFound.push({
          startIdx: temporaryStartIdx,
          endIdx: temporaryEndIdx,
          value: Number(parseInt(temporaryNumberString))
        });

        temporaryStartIdx = null;
        temporaryEndIdx = null;
        temporaryNumberString = "";
      }
    }

  }

  return numbersFound;
}

function isDigit(char: string): boolean {
  const charCode = char.charCodeAt(0);
  if (charCode >= 48 && charCode <= 57) {
    return true;
  }
  return false;
}

function filterByUnityDistance(value: NumberValue, symbolIndex: number): boolean {
  const adjacentStart = symbolIndex + 1;
  const adjacentEnd = symbolIndex - 1;
  // console.log(`value: ${value.value} | startIdx: ${value.startIdx} | endIdx:${value.endIdx} | Checking Symbol Idx: ${symbolIndex}`);
  return value.startIdx <= adjacentStart && adjacentEnd <= value.endIdx;
}

let sum = 0;
for (let i = 0; i < lines.length; i++) {
  let currentLine = lines[i];
  let filteredList: NumberValue[] | null = null;
  let previousLineNumbers: NumberValue[] | null = null;
  let currentLineNumbers: NumberValue[] | null = parseLine(lines[i]);
  let nextLineNumbers: NumberValue[] | null = null;

  for (let j = 0; j < currentLine.length; j++) {
    const char = currentLine.charAt(j);
    if (char === "*") {
      let symbolIndex = j;
      switch (i) {
        // first line case:
        case 0:
          nextLineNumbers = parseLine(lines[i + 1]);
          filteredList = [
            ...currentLineNumbers.filter((e) => filterByUnityDistance(e, symbolIndex)),
            ...nextLineNumbers.filter((e) => filterByUnityDistance(e, symbolIndex))
          ];
          if (filteredList.length == 2) {
            let product = 1;
            for (const num of filteredList) {
              product *= num.value;
            }
            sum += product;
          }
          break;
        // last line case
        case lines.length - 1:
          previousLineNumbers = parseLine(lines[i - 1]);
          filteredList = [
            ...previousLineNumbers.filter((e) => filterByUnityDistance(e, symbolIndex)),
            ...currentLineNumbers.filter((e) => filterByUnityDistance(e, symbolIndex)),
          ];
          if (filteredList.length == 2) {
            let product = 1;
            for (const num of filteredList) {
              product *= num.value;
            }
            sum += product;
          }
          break;
        default:
          previousLineNumbers = parseLine(lines[i - 1]);
          nextLineNumbers = parseLine(lines[i + 1]);
          filteredList = [
            ...previousLineNumbers.filter((e) => filterByUnityDistance(e, symbolIndex)),
            ...currentLineNumbers.filter((e) => filterByUnityDistance(e, symbolIndex)),
            ...nextLineNumbers.filter((e) => filterByUnityDistance(e, symbolIndex))
          ];
          // console.log(`Line: ${i} | Symbol: ${char} | Symbol Index ${symbolIndex} | Filtered List: ${JSON.stringify(filteredList, null, 2)}`);
          if (filteredList.length == 2) {
            let product = 1;
            for (const num of filteredList) {
              product *= num.value;
            }
            sum += product;
          }
          break;
      }
    }
  }
}

console.log(`Sum: ${sum}`);
