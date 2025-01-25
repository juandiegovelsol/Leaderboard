"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMonth = createMonth;
/**
 * Represents a single day in the calendar.
 */
var Day = /** @class */ (function () {
    function Day(date, // e.g. 1..31
    dayOfWeek, // 0 for Sunday, 1 for Monday, etc.
    monthIndex, // 0 for January, 1 for February, etc.
    year // e.g. 2023
    ) {
        this.date = date;
        this.dayOfWeek = dayOfWeek;
        this.monthIndex = monthIndex;
        this.year = year;
    }
    return Day;
}());
/**
 * Represents a 7-day week in the calendar.
 * Each slot can be a Day object or null if that slot doesn't belong to the current month.
 */
var Week = /** @class */ (function () {
    function Week() {
        // Initialize a week array of 7 slots, all null by default
        this.days = new Array(7).fill(null);
    }
    return Week;
}());
/**
 * Represents a full month of weeks in the calendar.
 */
var Month = /** @class */ (function () {
    function Month(monthIndex, year) {
        this.monthIndex = monthIndex;
        this.year = year;
        this.weeks = [];
        this.buildWeeks();
    }
    /**
     * Populates this Month instance with Week objects containing Day objects
     * in the correct positions, and null where there is no valid day.
     */
    Month.prototype.buildWeeks = function () {
        // Number of days in the month
        var daysInMonth = new Date(this.year, this.monthIndex + 1, 0).getDate();
        // Day of week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
        // e.g. if the month starts on a Tuesday, this would be 2
        var firstDayOfWeek = new Date(this.year, this.monthIndex, 1).getDay();
        var currentDay = 1;
        var currentWeek = new Week();
        // Fill up the first week with null until the firstDayOfWeek
        for (var i = 0; i < firstDayOfWeek; i++) {
            currentWeek.days[i] = null; // No day yet
        }
        // Fill up the remainder of the first week with Day objects
        for (var i = firstDayOfWeek; i < 7 && currentDay <= daysInMonth; i++) {
            currentWeek.days[i] = new Day(currentDay, i, // day of week
            this.monthIndex, this.year);
            currentDay++;
        }
        // Push the first week onto the list
        this.weeks.push(currentWeek);
        // Build out subsequent weeks
        while (currentDay <= daysInMonth) {
            var newWeek = new Week();
            for (var i = 0; i < 7 && currentDay <= daysInMonth; i++) {
                newWeek.days[i] = new Day(currentDay, i, // day of week
                this.monthIndex, this.year);
                currentDay++;
            }
            this.weeks.push(newWeek);
        }
    };
    /**
     * Creates and returns a matrix of numbers based on the Day objects we've created.
     * - 0 will be used in slots that have no valid Day.
     */
    Month.prototype.toMatrix = function () {
        return this.weeks.map(function (week) {
            return week.days.map(function (day) { return (day ? day.date : 0); });
        });
    };
    return Month;
}());
/**
 * Standalone function that uses the Month class to build a matrix of days.
 * @param monthIndex - 0-based month index (0 for January, 1 for February, etc.)
 * @param year - Four-digit year. Defaults to the current year if omitted.
 * @returns A 2D array representing the calendar month,
 *          with 0 in slots that do not belong to that month.
 */
function createMonth(monthIndex, year) {
    if (year === void 0) { year = new Date().getFullYear(); }
    var month = new Month(monthIndex, year);
    return month.toMatrix();
}
var matrixForMarch = createMonth(2, 2025); // March 2022
console.log(matrixForMarch);
/*
Expected output (for March 2022):
[
    [0, 0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 0, 0]
]
*/ 
