/**
 * Represents a single day in the calendar.
 */
class Day {
  constructor(
    public date: number,       // e.g. 1..31
    public dayOfWeek: number,  // 0 for Sunday, 1 for Monday, etc.
    public monthIndex: number, // 0 for January, 1 for February, etc.
    public year: number        // e.g. 2023
  ) {}
}

/**
 * Represents a 7-day week in the calendar.
 * Each slot can be a Day object or null if that slot doesn't belong to the current month.
 */
class Week {
  public days: Array<Day | null>;

  constructor() {
    // Initialize a week array of 7 slots, all null by default
    this.days = new Array<Day | null>(7).fill(null);
  }
}

/**
 * Represents a full month of weeks in the calendar.
 */
class Month {
  public weeks: Week[];

  constructor(public monthIndex: number, public year: number) {
    this.weeks = [];
    this.buildWeeks();
  }

  /**
   * Populates this Month instance with Week objects containing Day objects
   * in the correct positions, and null where there is no valid day.
   */
  private buildWeeks() {
    // Number of days in the month
    const daysInMonth = new Date(this.year, this.monthIndex + 1, 0).getDate();

    // Day of week for the first day of the month (0 = Sunday, 1 = Monday, etc.)
    // e.g. if the month starts on a Tuesday, this would be 2
    const firstDayOfWeek = new Date(this.year, this.monthIndex, 1).getDay();

    let currentDay = 1;
    let currentWeek = new Week();

    // Fill up the first week with null until the firstDayOfWeek
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.days[i] = null; // No day yet
    }

    // Fill up the remainder of the first week with Day objects
    for (let i = firstDayOfWeek; i < 7 && currentDay <= daysInMonth; i++) {
      currentWeek.days[i] = new Day(
        currentDay,
        i, // day of week
        this.monthIndex,
        this.year
      );
      currentDay++;
    }

    // Push the first week onto the list
    this.weeks.push(currentWeek);

    // Build out subsequent weeks
    while (currentDay <= daysInMonth) {
      const newWeek = new Week();
      for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
        newWeek.days[i] = new Day(
          currentDay,
          i, // day of week
          this.monthIndex,
          this.year
        );
        currentDay++;
      }
      this.weeks.push(newWeek);
    }
  }

  /**
   * Creates and returns a matrix of numbers based on the Day objects we've created.
   * - 0 will be used in slots that have no valid Day.
   */
  public toMatrix(): number[][] {
    return this.weeks.map((week) =>
      week.days.map((day) => (day ? day.date : 0))
    );
  }
}

/**
 * Standalone function that uses the Month class to build a matrix of days.
 * @param monthIndex - 0-based month index (0 for January, 1 for February, etc.)
 * @param year - Four-digit year. Defaults to the current year if omitted.
 * @returns A 2D array representing the calendar month, 
 *          with 0 in slots that do not belong to that month.
 */
export function createMonth(
  monthIndex: number,
  year: number = new Date().getFullYear()
): number[][] {
  const month = new Month(monthIndex, year);
  return month.toMatrix();
}


const matrixForMarch = createMonth(2, 2025); // March 2022
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