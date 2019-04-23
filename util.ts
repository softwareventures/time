import isInteger = require("is-integer");

/**
 * Tests if the specified value is an integer in the specified range.
 * @internal
 */
export function isIntegerInRange(value: number, start: number, end?: number): boolean {
    if (end == null) {
        end = start;
        start = 0;
    }

    if (typeof start !== "number" || typeof end !== "number") {
        throw new TypeError("Expected start and end to be numbers");
    }

    return isInteger(value)
        && value >= Math.min(start, end)
        && value <= Math.max(start, end);
}