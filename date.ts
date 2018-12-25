/** An abstract date, with no associated time zone. */

export interface Date {
    day: number;
    month: number;
    year: number;
}

export const JANUARY = 1;
export const FEBRUARY = 2;
export const MARCH = 3;
export const APRIL = 4;
export const MAY = 5;
export const JUNE = 6;
export const JULY = 7;
export const AUGUST = 8;
export const SEPTEMBER = 9;
export const OCTOBER = 10;
export const NOVEMBER = 11;
export const DECEMBER = 12;

export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0)
        || (year % 400 === 0);
}

export function daysInMonth(month: number, year: number): number {
    if (month < JANUARY || month > DECEMBER) {
        throw new Error("Invalid month");
    } else if (month === FEBRUARY && isLeapYear(year)) {
        return 29;
    } else {
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    }
}

export function isValid(date: Readonly<Date>): boolean {
    return date.month >= JANUARY && date.month <= DECEMBER
        && date.day >= 1 && date.day <= daysInMonth(date.month, date.year);
}

export function validate(date: Readonly<Date>): void {
    if (!isValid(date)) {
        throw new Error("Invalid date");
    }
}

/**
 * Converts the specified date to a count of the number of days since the
 * reference date of 1st January, 1 CE.
 */
export function toReferenceDays(date: Partial<Readonly<Date>>): number {
    const day = date.day == null ? 1 : date.day;
    const month = date.month == null ? 1 : date.month;
    const year = date.year == null ? 1 : date.year;

    const referenceMonths = (year - 1) * 12 + month - 1;

    return Math.floor(referenceMonths * 365 / 12)
        + Math.floor((referenceMonths + 10) / 48)
        - Math.floor((referenceMonths + 10) / 1200)
        + Math.floor((referenceMonths + 10) / 4800)
        + [0, 1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0][(12 + (referenceMonths % 12)) % 12]
        + day - 1;
}

/**
 *  Creates a date corresponding to the specified count of the number of days
 *  since the reference date of 1st January, 1 CE.
 */
export function fromReferenceDays(referenceDays: number): Date {
    const referenceMonths = Math.floor(referenceDays / 30.436875);
    const year = Math.floor(referenceMonths / 12) + 1;
    const month = referenceMonths % 12 + 1;
    const day = referenceDays + 366
        - year * 365
        - Math.floor((referenceMonths + 10) / 4800)
        + Math.floor((referenceMonths + 10) / 1200)
        - Math.floor((referenceMonths + 10) / 48)
        - Math.floor((referenceMonths + 10) / 12)
        - [0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][month];

    return {day, month, year};
}
