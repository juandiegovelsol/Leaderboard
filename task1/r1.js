var Day = /** @class */ (function () {
    function Day(date) {
        this.date = date;
    }
    return Day;
}());
var Week = /** @class */ (function () {
    function Week() {
        this.days = [];
    }
    return Week;
}());
var Month = /** @class */ (function () {
    function Month(monthIndex, year) {
        this.weeks = [];
        // Create a Date object for the first day of the month
        var firstDay = new Date(year, monthIndex, 1);
        // Adjust to make Monday=0, ..., Sunday=6
        var startingDay = firstDay.getDay() - 1;
        if (startingDay < 0)
            startingDay = 6; // Adjust Sunday from -1 to 6
        // Get the number of days in the month
        var lastDay = new Date(year, monthIndex + 1, 0); // Last day of the month
        var numDays = lastDay.getDate();
        var week = new Week();
        // Fill the first week with zeros up to the starting day
        for (var i = 0; i < startingDay; i++) {
            week.days.push(0); // 0 represents an empty day
        }
        // Fill the weeks with day numbers
        for (var day = 1; day <= numDays; day++) {
            week.days.push(day);
            if (week.days.length === 7) {
                this.weeks.push(week);
                week = new Week();
            }
        }
        // Fill the last week with zeros if it's not complete
        if (week.days.length > 0) {
            while (week.days.length < 7) {
                week.days.push(0);
            }
            this.weeks.push(week);
        }
    }
    // Method to get the weeks as a matrix of numbers
    Month.prototype.getMatrix = function () {
        return this.weeks.map(function (week) { return week.days; });
    };
    return Month;
}());
function createMonth(monthIndex) {
    var year = new Date().getFullYear(); // Use the current year
    var month = new Month(monthIndex, year);
    console.log("Ano", year, "Mes", month);
    return month.getMatrix();
}
// Example usage:
var monthMatrix = createMonth(3); // March (index 2)
console.log(monthMatrix);
/* Output:
[
  [0, 0, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 0, 0]
]
*/ 
