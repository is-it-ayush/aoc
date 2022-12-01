/**
 * Advent Of Code: Day 1: Statement 2 (MISUNDERSTOOD)
 * Note: I misunderstood the question and realized it after I wrote the solution.
 * This assumes the file is already marked with the following window keys which was unclear in the problem statement.
 * @year 2021
 * @author Ayush Gupta
 * @github is-it-ayush
 */

const input = await Deno.readTextFile("./misunderstood_input.txt");
const splitInput = input.split("\n");

calculate_depth_measure(splitInput);


function calculate_depth_measure(x: string[]) {
    let linePos = 0;
    let counter = 0;

    const keyString: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const list: Map<string, number> = new Map<string, number>(keyString.map(i => [i, 0]));


    /**
     * This solution assumes that the file input format is maintained.
     * Input Format:
     * <Number> <Char> <Char> ...
     */

    while (linePos < x.length) {
        const lineSplit = x[linePos].trim();
        let nString = "";
        for (let i = 0; i < lineSplit.length; i++) {
            if (lineSplit.charCodeAt(i) >= 65 && lineSplit.charCodeAt(i) <= 90) {
                // Assuming: before we hit a letter, we already have our number. 
                // Reason: since letters are appended later (every time).
                const key = lineSplit.charAt(i).toUpperCase().toString();
                const toSet = list.get(key) as number; // We explicitly defined the keys. It'll always exist.
                list.set(key, toSet + parseInt(nString));
            }
            else {
                if (lineSplit.charCodeAt(i) !== 32) {
                    nString += lineSplit.charAt(i);
                }
            }
        }
        linePos++;
    }

    // Reusing solution from './a.ts'. (Statement 1) and looping over the array created from the map values.
    let pos = 0;
    const onlyValues: number[] = Array.from(list.values());
    while (pos < onlyValues.length) {
        if (onlyValues[pos] != 0) { // Optimization 1: We don't need to loop over 0 values.
            // Current Value < Next Value ?  Yes = Increment : No = Do Nothing.
            if (onlyValues[pos] < onlyValues[pos + 1]) counter++;
        }
        pos++;
    }

    console.log(counter);
}
