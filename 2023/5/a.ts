// input and input process;
const input = await(Bun.file(`./2023/${process.env.AOC_DAY}/input.txt`)).text();
const lines = input.trim().split("\n\n");

console.log(lines);

type MapRD = {
  destination: number;
  source: number;
  range: number;
  difference: number;
}

// seeds: 79 14 55 13
function getSeeds(firstLine: string): number[] {
  return firstLine.split(":").map((e) => e.trim())[1].split(" ").map((e) => Number(e.trim()));
}

//   D  S  R
// \n50 98 2
function getDifferenceAndRange(mapLine: string): MapRD {
  const values = mapLine.split(" ").map((e) => e.trim()).map(Number);
  return {
    source: values[1],
    destination: values[0],
    difference: values[1] - values[0],
    range: values[2]
  }
}

const seeds = getSeeds(lines[0]);
const locationStore: number[] = Array.from({ length: seeds.length });
locationStore.fill(0);

// for every seed...
seedLoop: seeds.map((seed, idx) => {
  let newSeed = seed;

  /// seed-to-soil map:\n50 98 2\n52 50 48
  mapLoop: for (let i = 1; i < lines.length; ++i) {
    const currentMap = lines[i];
    const mapLines = currentMap.split(":")[1].split("\n").filter((e) => e.length !== 0).map((e) => e.trim());
    // console.log(`mapLines: ${JSON.stringify(mapLines, null, 2)}`)

    for (const mapLine of mapLines) {
      const mapInformation = getDifferenceAndRange(mapLine);
      console.log(`MapLine: ${mapLine} | Difference: ${mapInformation.difference} | Range: ${mapInformation.range}`)



      const valueToUse = locationStore[idx] === 0 ? seed : locationStore[idx];
      newSeed = valueToUse - mapInformation.difference;
      if (newSeed >= mapInformation.source && newSeed <= (mapInformation.source + mapInformation.range)) {
        console.log(`did: ${valueToUse} - ${mapInformation.difference} | got: ${newSeed}`)
        console.log(`for seed ${idx}: ${valueToUse} is now ${newSeed} as ${newSeed} lies between ${mapInformation.source} && ${mapInformation.source + mapInformation.range}`)
        locationStore[idx] = newSeed;
      }
    }

    // if we cannot find a newSeed for this map.
    if (locationStore[idx] === 0) {
      locationStore[idx] = seed;
    }
  }
  console.log(`-----------------`)
});
console.log(seeds);
console.log(locationStore);
