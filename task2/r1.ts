/* class Solution {
    convert(s: string, numRows: number): string {
        let direction: number = 0; // 0 for right, 1 for down-left
        let positionalDictionary: { [key: number]: string } = {};
        let currRow: number = 0;
        let currCol: number = 0;

        if (numRows === 1) {
            return s;
        }

        for (let i = 0; i < s.length; i++) {
            let letter = s[i];
            // Swapped currRow and currCol in the positional value
            let positionalValue = currRow + 1000 * currCol; // Multiplied by 1000 to maintain order
            positionalDictionary[positionalValue] = letter;
            
            // Boundary check for direction flipping
            if (direction === 0 && currCol === numRows - 1) {
                direction = 1;
            } else if (direction === 1 && currCol === 0) {
                direction = 0;
            }

            if (direction === 0) { // Moving right
                currCol++;
            } else if (direction === 1) { // Moving down-left
                currRow++;
                currCol--;
            }
        }

        // Sort the positional dictionary by keys
        const sortedDict = Object.keys(positionalDictionary).sort((a, b) => parseInt(a) - parseInt(b));
        
        // Construct the result string
        let result = '';
        for (let key of sortedDict) {
            result += positionalDictionary[key];
        }

        return result;
    }
}



// Test cases
const testCases = [
    { s: "PAYPALISHIRING", numRows: 3 },
    { s: "HELLO WORLD", numRows: 4 },
    { s: "THISISAZIGZAG", numRows: 5 },
];

// Run tests
function runTests() {
    const solution = new Solution();
    for (const { s, numRows } of testCases) {
        const output = solution.convert(s, numRows);
        console.log(`Input: "${s}", numRows: ${numRows}`);
        console.log(`Output: "${output}"\n`);
    }
}

runTests(); */