var Solution = /** @class */ (function () {
    function Solution() {
    }
    Solution.prototype.convert = function (s, numRows) {
        var direction = 0; // 0 for right, 1 for down-left
        var positionalDictionary = {};
        var currRow = 0;
        var currCol = 0;
        if (numRows === 1) {
            return s;
        }
        for (var i = 0; i < s.length; i++) {
            var letter = s[i];
            // Swapped currRow and currCol in the positional value
            var positionalValue = currRow + 1000 * currCol; // Multiplied by 1000 to maintain order
            positionalDictionary[positionalValue] = letter;
            // Boundary check for direction flipping
            if (direction === 0 && currCol === numRows - 1) {
                direction = 1;
            }
            else if (direction === 1 && currCol === 0) {
                direction = 0;
            }
            if (direction === 0) { // Moving right
                currCol++;
            }
            else if (direction === 1) { // Moving down-left
                currRow++;
                currCol--;
            }
        }
        // Sort the positional dictionary by keys
        var sortedDict = Object.keys(positionalDictionary).sort(function (a, b) { return parseInt(a) - parseInt(b); });
        // Construct the result string
        var result = '';
        for (var _i = 0, sortedDict_1 = sortedDict; _i < sortedDict_1.length; _i++) {
            var key = sortedDict_1[_i];
            result += positionalDictionary[key];
        }
        return result;
    };
    return Solution;
}());
// Test cases
var testCases = [
    { s: "PAYPALISHIRING", numRows: 3 },
    { s: "HELLO WORLD", numRows: 4 },
    { s: "THISISAZIGZAG", numRows: 5 },
];
// Run tests
function runTests() {
    var solution = new Solution();
    for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
        var _a = testCases_1[_i], s = _a.s, numRows = _a.numRows;
        var output = solution.convert(s, numRows);
        console.log("Input: \"".concat(s, "\", numRows: ").concat(numRows));
        console.log("Output: \"".concat(output, "\"\n"));
    }
}
runTests();
