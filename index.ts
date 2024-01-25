/** @file Data types and functions for working with abstract times of day. */

import {hasProperty} from "unknown";
import isIntegerInRange from "is-integer-in-range";
import type {Comparator} from "@softwareventures/ordered";
import {Comparison} from "@softwareventures/ordered";
import {JsDate} from "./js-date";

/** An abstract time of day with no associated timezone or date. */
export interface Time {
    /** Type discriminator identifying the object as a `Time`. */
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
        time.seconds >= 0 &&
        time.seconds < 60
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
 * If any numeric components are outside the expected range, then they
 * will roll over into the next larger component. If the time as a whole
 * is outside the 24-hour range, then the time will wrap around by as
 * many 24-hour periods as needed to put it in the valid range.
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

/** Tests if two Times are equal. */
export function equal(a: TimeOptions, b: TimeOptions): boolean {
    return toReferenceSeconds(a) === toReferenceSeconds(b);
}

/** Tests if two Times are equal.
 *
 * Alias for {@link equal}. */
export const timeEqual = equal;

/** Tests if two Times are equal.
 *
 * Curried variant of {@link equal}. */
export function equalFn(b: TimeOptions): (a: TimeOptions) => boolean {
    return a => equal(a, b);
}

/** Tests if two Times are equal.
 *
 * Alias for {@link equalFn}. */
export const timeEqualFn = equalFn;

/** Tests if two Times are not equal. */
export function notEqual(a: TimeOptions, b: TimeOptions): boolean {
    return toReferenceSeconds(a) !== toReferenceSeconds(b);
}

/** Tests if two Times are not equal.
 *
 * Alias for {@link notEqual}. */
export const timeNotEqual = notEqual;

/** Tests if two Times are not equal.
 *
 * Curried variant of {@link notEqual}. */
export function notEqualFn(b: TimeOptions): (a: TimeOptions) => boolean {
    return a => notEqual(a, b);
}

/** Tests if two Times are not equal.
 *
 * Alias for {@link notEqualFn}. */
export const timeNotEqualFn = notEqualFn;

/** Compares two Times.
 *
 * Time `a` is considered to be `before` time `b` if time `a` is
 * earlier in the day. */
export const compare: Comparator<TimeOptions> = (a, b) => {
    const as = toReferenceSeconds(a);
    const bs = toReferenceSeconds(b);

    if (as < bs) {
        return Comparison.before;
    } else if (as > bs) {
        return Comparison.after;
    } else if (as === bs) {
        return Comparison.equal;
    } else {
        return Comparison.undefined;
    }
};

/** Compares two Times.
 *
 * Time `a` is considered to be `before` time `b` if time `a` is
 * earlier in the day.
 *
 * Alias for {@link compare}. */
export const timeCompare = compare;

/** Compares two Times.
 *
 * Time `a` is considered to be `before` time `b` if time `a` is
 * earlier in the day.
 *
 * Curried variant of {@link compare}. */
export function compareFn(b: TimeOptions): (a: TimeOptions) => Comparison {
    return a => compare(a, b);
}

/** Compares two Times.
 *
 * Time `a` is considered to be `before` time `b` if time `a` is
 * earlier in the day.
 *
 * Alias for {@link compareFn}. */
export const timeCompareFn = compareFn;

/** Tests if Time `a` is earlier in the day than Time `b`. */
export function before(a: TimeOptions, b: TimeOptions): boolean {
    return toReferenceSeconds(a) < toReferenceSeconds(b);
}

/** Tests if Time `a` is earlier in the day than Time `b`.
 *
 * Alias for {@link before}. */
export const timeBefore = before;

/** Tests if Time `a` is earlier in the day than Time `b`.
 *
 * Curried variant of {@link before}. */
export function beforeFn(b: TimeOptions): (a: TimeOptions) => boolean {
    return a => before(a, b);
}

/** Tests if Time `a` is earlier in the day than Time `b`.
 *
 * Alias for {@link beforeFn}. */
export const timeBeforeFn = beforeFn;

/** Tests if Time `a` is equal to or earlier in the day than Time `b`. */
export function beforeOrEqual(a: TimeOptions, b: TimeOptions): boolean {
    return toReferenceSeconds(a) <= toReferenceSeconds(b);
}

/** Tests if Time `a` is equal to or earlier in the day than Time `b`.
 *
 * Alias for {@link beforeOrEqual}. */
export const timeBeforeOrEqual = beforeOrEqual;

/** Tests if Time `a` is equal to or earlier in the day than Time `b`.
 *
 * Curried variant of {@link beforeOrEqual}. */
export function beforeOrEqualFn(b: TimeOptions): (a: TimeOptions) => boolean {
    return a => beforeOrEqual(a, b);
}

/** Tests if Time `a` is equal to or earlier in the day than Time `b`.
 *
 * Alias for {@link beforeOrEqualFn}. */
export const timeBeforeOrEqualFn = beforeOrEqualFn;

/** Tests if Time `a` is later in the day than Time `b`. */
export function after(a: TimeOptions, b: TimeOptions): boolean {
    return toReferenceSeconds(a) > toReferenceSeconds(b);
}

/** Tests if Time `a` is later in the day than Time `b`.
 *
 * Alias for {@link after}. */
export const timeAfter = after;

/** Tests if Time `a` is later in the day than Time `b`.
 *
 * Curried variant of {@link after}. */
export function afterFn(b: TimeOptions): (a: TimeOptions) => boolean {
    return a => after(a, b);
}

/** Tests if Time `a` is later in the day than Time `b`.
 *
 * Alias for {@link afterFn}. */
export const timeAfterFn = afterFn;

/** Returns the current time of day in UTC. */
export function nowUtc(): Time {
    const now = new JsDate();
    return {
        type: "time",
        hours: now.getUTCHours(),
        minutes: now.getUTCMinutes(),
        seconds: now.getUTCSeconds() + 0.001 * now.getUTCMilliseconds()
    };
}

/** Returns the current time of day in UTC.
 *
 * Alias for {@link nowUtc}. */
export const timeNowUtc = nowUtc;

/** Returns the current time of day in the device's local timezone. */
export function nowDeviceLocal(): Time {
    const now = new JsDate();
    return {
        type: "time",
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds() + 0.001 * now.getMilliseconds()
    };
}

/** Returns the current time of day in the device's local timezone.
 *
 * Alias for {@link nowDeviceLocal}. */
export const timeNowDeviceLocal = nowDeviceLocal;
