import assert from "assert";

// input and input process;
const input = await (Bun.file(`./2023/${process.env.AOC_DAY}/input.txt`)).text();
const lines = input.trim().split("\n");

// 32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483

const CamelCards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"] as const;
type CamelCard = typeof CamelCards[number];

// S = Same, D = Different
//                 5S              4S, 1D          3S, 2S         3S,2D           2S, 2S, 1D  2S,1D       1D
const GameRules = ["five_of_kind", "four_of_kind", "full_house", "three_of_kind", "two_pair", "one_pair", "high_card", "unknown"] as const;
type GameRule = typeof GameRules[number];

// [3, 2, T, 3, K]
function detectRule(cards: CamelCard[]): GameRule {
  let frequencyTracker = [0, 0, 0, 0, 0];
  let cardCodePoints = cards.map((c) => c.codePointAt(0));

  for (let i = 0; i < cardCodePoints.length; ++i) {
    for (let j = 0; j < cardCodePoints.length; ++j) {
      if (cardCodePoints[i] === cardCodePoints[j]) {
        frequencyTracker[i] += 1;
      }
    }
  }

  frequencyTracker.sort((a, b) => b - a);
  const twoCount = frequencyTracker.reduce((acc, item, idx) => { if (item === 2) ++acc; return acc; }, 0);
  frequencyTracker = [...new Set(frequencyTracker)];
  const frequencyA = frequencyTracker[0];
  const frequencyB = frequencyTracker[1];

  switch (true) {
    case frequencyA === 5:
      return "five_of_kind";
    case frequencyA === 4 && frequencyB === 1:
      return "four_of_kind";
    case frequencyA === 3 && frequencyB === 2:
      return "full_house";
    case frequencyA === 3 && frequencyB === 1:
      return "three_of_kind";
    case frequencyA === 2 && twoCount === 4:
      return "two_pair";
    case frequencyA === 2 && frequencyB === 1:
      return "one_pair";
    case frequencyA === 1:
      return "high_card";
    default:
      return "unknown";
  }
}

// KTJJT
function parseCards(cardsLine: string): CamelCard[] {
  return cardsLine.trim().split("").filter((s) => s.length !== 0) as CamelCard[];
}


// KTJJT 220
const bidArray = Array.from({ length: lines.length });
bidArray.fill(0);
for (const line of lines) {
  const [hand, bid] = line.trim().split(" ").map((s => s.trim()));
  console.log(detectRule(parseCards(hand)));
}
