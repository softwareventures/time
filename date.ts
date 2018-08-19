/** An abstract date, with no associated time zone. */
export interface Date {
    readonly day: number;
    readonly month: number;
    readonly year: number;
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