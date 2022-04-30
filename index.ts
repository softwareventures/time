/** @file Data types and functions for working with abstract times of day. */

import {hasProperty} from "unknown";
import isIntegerInRange from "is-integer-in-range";

/** An abstract time of day with no associated timezone or date. */
export interface Time {
    /** Type discriminator. */
    readonly type: "time";

    /** The hours component of the time of day. Should be an integer in the
     * range 0-23. */
    readonly hours: number;

    /** The minutes component of the time of day. Should be an integer in the
     * range 0-59. */
    readonly minutes: number;

    /** The seconds component of the time of day. Should be in the range 0-60,
     * inclusive of 0 but exclusive of 60. May be fractional to represent an
     * instant in time with sub-second accuracy. */
    readonly seconds: number;
}

/** Options for creating a {@link Time}.
 *
 * An instance of {@link Time} may always be used in place of TimeOptions. */
export type TimeOptions = Partial<Time>;

/** Tests if the specified value has the shape of a Time object.
 *
 * Returns true if the value is an object that has numeric `hours`, `minutes`
 * and `seconds` fields, and a `type` field set to `"time"`.
 *
 * The numeric fields may be non-integers or outside the expected range,
 * meaning that the object may not represent a valid time.
 *
 * To test if the object represents a valid time, call {@link isValid} or
 * {@link isTimeValid}. */
export function isTime(value: unknown): value is Time {
    return (
        typeof value === "object" &&
        value != null &&
        hasProperty(value, "type") &&
        value.type === "time" &&
        hasProperty(value, "hours") &&
        typeof value.hours === "number" &&
        hasProperty(value, "minutes") &&
        typeof value.minutes === "number" &&
        hasProperty(value, "seconds") &&
        typeof value.seconds === "number"
    );
}

/** Tests if the specified Time object represents a valid time.
 *
 * Returns true if `hours` and `minutes` are integers within the expected
 * range, and `seconds` is a number within the expected range.
 *
 * Times returned by functions in this library are always valid. */
export function isValid(time: Time): boolean {
    return (
        isIntegerInRange(time.hours, 0, 23) &&
        isIntegerInRange(time.minutes, 0, 59) &&
        time.seconds >= 0 && time.seconds < 60
    );
}

/** Tests if the specified Time object represents a valid time.
 *
 * Returns true if `hours` and `minutes` are integers within the expected
 * range, and `seconds` is a number within the expected range.
 *
 * Times returned by functions in this library are always valid. */
export const isTimeValid = isValid;

/** Creates a Time with the specified options.
 *
 * If any numeric components are unspecified, they default to zero.
 *
 * If any numeric components are outside the expected range, then they
 * will roll over into the next larger component. If the time as a whole
 * is outside the 24-hour range, then the time will wrap around by as
 * many 24-hour periods as needed to put it in the valid range.
 *
 * @throws {Error} if any of the numeric components are non-finite. */
export function time(time: TimeOptions): Time {
    return fromReferenceSeconds(toReferenceSeconds(time));
}

/** Creates a Time with the specified options.
 *
 * If any numeric components are unspecified, they default to zero.
 *
 * If any numeric components are outside the expected range, then
 * the resulting Time will be normalized.
 *
 * @throws {Error} if any of the numeric components are non-finite. */
export const normalize = time;

/** Converts the specified Time to a count of seconds since midnight. */
export function toReferenceSeconds(time: TimeOptions): number {
    const hours = time.hours ?? 0;
    const minutes = time.minutes ?? 0;
    const seconds = time.seconds ?? 0;

    return (86400 + ((hours * 3600 + minutes * 60 + seconds) % 86400)) % 86400;
}

/** Creates a Time corresponding to the specified count of seconds
 * since midnight.
 *
 * @throws {Error} if seconds is not a finite value. */
export function fromReferenceSeconds(seconds: number): Time {
    if (!isFinite(seconds)) {
        throw new Error("Non-finite seconds");
    }
    const hours = Math.floor(seconds / 3600);
    const seconds2 = seconds - hours * 3600;
    const minutes = Math.floor(seconds2 / 60);
    const seconds3 = seconds2 - minutes * 60;
    return {type: "time", hours, minutes, seconds: seconds3};
}
