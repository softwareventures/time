/** @file Data types and functions for working with abstract times of day. */

import {hasProperty} from "unknown";
import isIntegerInRange from "is-integer-in-range";
import * as format from "@softwareventures/format-time";
import type {TimeFormatter} from "@softwareventures/format-time";
import type {Comparator} from "@softwareventures/ordered";
import {Comparison} from "@softwareventures/ordered";
import {mapOptional} from "@softwareventures/nullable";
import {JsDate} from "./js-date";

/** An abstract time of day with no associated timezone or date. */
export interface Time {
    /** Type discriminator identifying the object as a `Time`. */
    readonly type: "Time";

    /** The hours component of the time of day. Should be an integer in the
     * range `0`-`23`. */
    readonly hours: number;

    /** The minutes component of the time of day. Should be an integer in the
     * range `0`-`59`. */
    readonly minutes: number;

    /** The seconds component of the time of day. Should be in the range
     * `0`-`60`, inclusive of `0` but exclusive of `60`. May be fractional
     * to represent an instant in time with sub-second accuracy. */
    readonly seconds: number;
}

/** Options for creating a {@link Time}.
 *
 * An instance of {@link Time} may always be used in place of `TimeOptions`. */
export type TimeOptions = Partial<Time>;

/** Returns `true` if the specified value has the shape of a `Time` object.
 *
 * The `hours`, `minutes` and `seconds` fields may be non-integers or outside
 * the expected range, meaning that the object may not represent a valid time.
 *
 * To test if the object represents a valid time, call {@link isValid} or
 * {@link isValidTime}. */
export function isTime(value: unknown): value is Time {
    return (
        typeof value === "object" &&
        value != null &&
        hasProperty(value, "type") &&
        value.type === "Time" &&
        hasProperty(value, "hours") &&
        typeof value.hours === "number" &&
        hasProperty(value, "minutes") &&
        typeof value.minutes === "number" &&
        hasProperty(value, "seconds") &&
        typeof value.seconds === "number"
    );
}

/** Tests if the specified value is a {@link Time} object representing a valid
 * time.
 *
 * Returns `true` if the value has the shape of a `Time` object, the `hours` and
 * `minutes` fields are integers within the expected range, and `seconds`
 * is a number within the expected range. */
export function isValidTime(value: unknown): value is Time {
    return isTime(value) && isValid(value);
}

/** Tests if the specified {@link Time} object represents a valid time.
 *
 * Returns true if `hours` and `minutes` are integers within the expected
 * range, and `seconds` is a number within the expected range.
 *
 * Times returned by functions in this library are always valid. */
export function isValid(time: Time): boolean {
    return (
        (!hasProperty(time, "type") || time.type === "Time") &&
        isIntegerInRange(time.hours, 0, 23) &&
        isIntegerInRange(time.minutes, 0, 59) &&
        time.seconds >= 0 &&
        time.seconds < 60
    );
}

/** Tests if the specified {@link Time} object represents a valid time.
 *
 * Returns true if `hours` and `minutes` are integers within the expected
 * range, and `seconds` is a number within the expected range.
 *
 * Times returned by functions in this library are always valid. */
export const isTimeValid = isValid;

/**
 * Asserts that the specified {@link Time} object represents a valid time.
 *
 * Times returned by functions in this library are always valid.
 *
 * @throws {Error} if any of the `hour` or `minute` fields are non-integers,
 *   or if any of the `hour`, `minute` or `second` fields are outside the
 *   valid range.
 */
export function validate(time: Time): void {
    if (!isValid(time)) {
        throw new Error("Invalid time");
    }
}

/**
 * Asserts that the specified {@link Time} object represents a valid time.
 *
 * Times returned by functions in this library are always valid.
 *
 * Alias of {@link validate}, useful for disambiguation from similar functions
 * that operate on other types.
 *
 * @throws {Error} if any of the `hour` or `minute` fields are non-integers,
 *   or if any of the `hour`, `minute` or `second` fields are outside the
 *   valid range.
 */
export const validateTime = validate;

/** Creates a {@link Time} with the specified options.
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

/** Normalizes the specified {@link Time} object so that it represents a valid
 * time.
 *
 * If any numeric components are unspecified, they default to zero.
 *
 * If any numeric components are outside the expected range, then they
 * will roll over into the next larger component. If the time as a whole
 * is outside the 24-hour range, then the time will wrap around by as
 * many 24-hour periods as needed to put it in the valid range.
 *
 * Alias of {@link time}. Calling the function by this name instead might make
 * code clearer in cases where the purpose is to normalize an existing `Time`
 * object.
 *
 * @throws {Error} if any of the numeric components are non-finite. */
export const normalize = time;

/** Normalizes the specified {@link Time} object so that it represents a valid
 * time.
 *
 * If any numeric components are unspecified, they default to zero.
 *
 * If any numeric components are outside the expected range, then they
 * will roll over into the next larger component. If the time as a whole
 * is outside the 24-hour range, then the time will wrap around by as
 * many 24-hour periods as needed to put it in the valid range.
 *
 * Alias of {@link time}. Calling the function by this name instead might make
 * code clearer in cases where the purpose is to normalize an existing `Time`
 * object.
 *
 * @throws {Error} if any of the numeric components are non-finite. */
export const normalizeTime = time;

/** Converts the specified {@link Time} to a count of seconds since
 * midnight. */
export function toReferenceSeconds(time: TimeOptions): number {
    const hours = time.hours ?? 0;
    const minutes = time.minutes ?? 0;
    const seconds = time.seconds ?? 0;

    return (86400 + ((hours * 3600 + minutes * 60 + seconds) % 86400)) % 86400;
}

/** Converts the specified {@link Time} to a count of seconds since
 * midnight.
 *
 * Alias of {@link toReferenceSeconds}, useful for disambiguation from similar
 * functions that operate on other types. */
export const timeToReferenceSeconds = toReferenceSeconds;

/** Creates a {@link Time} corresponding to the specified count of seconds
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
    return {type: "Time", hours, minutes, seconds: seconds3};
}

/** Creates a {@link Time} corresponding to the specified count of seconds
 * since midnight.
 *
 * Alias of {@link fromReferenceSeconds}, useful for disambiguation from
 * similar functions that operate on other types.
 *
 * @throws {Error} if seconds is not a finite value. */
export const timeFromReferenceSeconds = fromReferenceSeconds;

/** Tests if two {@link Time}s are equal. */
export function equal(a: TimeOptions, b: TimeOptions): boolean {
    return toReferenceSeconds(a) === toReferenceSeconds(b);
}

/** Tests if two {@link Time}s are equal.
 *
 * Alias of {@link equal}, useful for disambiguation from other equality
 * functions. */
export const timeEqual = equal;

/** Tests if two {@link Time}s are equal.
 *
 * Curried variant of {@link equal}. */
export function equalFn(b: TimeOptions): (a: TimeOptions) => boolean {
    return a => equal(a, b);
}

/** Tests if two {@link Time}s are equal.
 *
 * Curried variant of {@link timeEqual}. */
export const timeEqualFn = equalFn;

/** Tests if two {@link Time}s are not equal. */
export function notEqual(a: TimeOptions, b: TimeOptions): boolean {
    return toReferenceSeconds(a) !== toReferenceSeconds(b);
}

/** Tests if two {@link Time}s are not equal.
 *
 * Alias of {@link notEqual}, useful for disambiguation from other inequality
 * functions. */
export const timeNotEqual = notEqual;

/** Tests if two {@link Time}s are not equal.
 *
 * Curried variant of {@link notEqual}. */
export function notEqualFn(b: TimeOptions): (a: TimeOptions) => boolean {
    return a => notEqual(a, b);
}

/** Tests if two {@link Time}s are not equal.
 *
 * Curried variant of {@link timeNotEqual}. */
export const timeNotEqualFn = notEqualFn;

/** Compares two {@link Time}s.
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

/** Compares two {@link Time}s.
 *
 * Time `a` is considered to be `before` time `b` if time `a` is
 * earlier in the day.
 *
 * Alias of {@link compare}, useful for disambiguation from other comparison
 * functions. */
export const timeCompare = compare;

/** Compares two {@link Time}s.
 *
 * Time `a` is considered to be `before` time `b` if time `a` is
 * earlier in the day.
 *
 * Curried variant of {@link compare}. */
export function compareFn(b: TimeOptions): (a: TimeOptions) => Comparison {
    return a => compare(a, b);
}

/** Compares two {@link Time}s.
 *
 * Time `a` is considered to be `before` time `b` if time `a` is
 * earlier in the day.
 *
 * Curried variant of {@link timeCompare}. */
export const timeCompareFn = compareFn;

/** Tests if {@link Time} `a` is earlier in the day than {@link Time} `b`. */
export function before(a: TimeOptions, b: TimeOptions): boolean {
    return toReferenceSeconds(a) < toReferenceSeconds(b);
}

/** Tests if {@link Time} `a` is earlier in the day than {@link Time} `b`.
 *
 * Alias of {@link before}, useful for disambiguation from similar functions
 * that operate on other date/time types. */
export const timeBefore = before;

/** Tests if {@link Time} `a` is earlier in the day than {@link Time} `b`.
 *
 * Curried variant of {@link before}. */
export function beforeFn(b: TimeOptions): (a: TimeOptions) => boolean {
    return a => before(a, b);
}

/** Tests if {@link Time} `a` is earlier in the day than {@link Time} `b`.
 *
 * Curried variant of {@link timeBefore}. */
export const timeBeforeFn = beforeFn;

/** Tests if {@link Time} `a` is equal to or earlier in the day than
 * {@link Time} `b`. */
export function beforeOrEqual(a: TimeOptions, b: TimeOptions): boolean {
    return toReferenceSeconds(a) <= toReferenceSeconds(b);
}

/** Tests if {@link Time} `a` is equal to or earlier in the day than
 * {@link Time} `b`.
 *
 * Alias of {@link beforeOrEqual}, useful for disambiguation from similar
 * functions that operate on other date/time types. */
export const timeBeforeOrEqual = beforeOrEqual;

/** Tests if {@link Time} `a` is equal to or earlier in the day than
 * {@link Time} `b`.
 *
 * Curried variant of {@link beforeOrEqual}. */
export function beforeOrEqualFn(b: TimeOptions): (a: TimeOptions) => boolean {
    return a => beforeOrEqual(a, b);
}

/** Tests if {@link Time} `a` is equal to or earlier in the day than
 * {@link Time} `b`.
 *
 * Curried variant of {@link timeBeforeOrEqual}. */
export const timeBeforeOrEqualFn = beforeOrEqualFn;

/** Tests if {@link Time} `a` is later in the day than {@link Time} `b`. */
export function after(a: TimeOptions, b: TimeOptions): boolean {
    return toReferenceSeconds(a) > toReferenceSeconds(b);
}

/** Tests if {@link Time} `a` is later in the day than {@link Time} `b`.
 *
 * Alias of {@link after}, useful for disambiguation from similar functions
 * that operate on other date/time types. */
export const timeAfter = after;

/** Tests if {@link Time} `a` is later in the day than {@link Time} `b`.
 *
 * Curried variant of {@link after}. */
export function afterFn(b: TimeOptions): (a: TimeOptions) => boolean {
    return a => after(a, b);
}

/** Tests if {@link Time} `a` is later in the day than {@link Time} `b`.
 *
 * Curried variant of {@link timeAfter}. */
export const timeAfterFn = afterFn;

/** Returns the current time of day according to UTC. */
export function nowUtc(): Time {
    const now = new JsDate();
    return {
        type: "Time",
        hours: now.getUTCHours(),
        minutes: now.getUTCMinutes(),
        seconds: now.getUTCSeconds() + 0.001 * now.getUTCMilliseconds()
    };
}

/** Returns the current time of day according to UTC.
 *
 * Alias of {@link nowUtc}, useful for disambiguation from similar functions
 * that operate on other date/time types. */
export const timeNowUtc = nowUtc;

/** Returns the current time of day according to the device's local
 * timezone. */
export function nowDeviceLocal(): Time {
    const now = new JsDate();
    return {
        type: "Time",
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds() + 0.001 * now.getMilliseconds()
    };
}

/** Returns the current time of day according to the device's local timezone.
 *
 * Alias of {@link nowDeviceLocal}, useful for disambiguation from similar
 * functions that operate on other date/time types. */
export const timeNowDeviceLocal = nowDeviceLocal;

/**
 * Parses a {@link Time} from text in ISO 8601 format.
 *
 * The ISO 8601 text must not specify a time zone offset.
 *
 * If the specified text is not a valid ISO 8601 time then this function
 * returns `null`.
 *
 * Both extended `Thh:mm:ss.sss` and basic `Thhmmss.sss` ISO 8601 formats are
 * accepted, and the initial `T` is optional in both cases. The seconds field
 * may be omitted, and the minutes field may also be omitted if the seconds
 * field is omitted. Omitted fields default to zero.
 */
export function parseIso8601(text: string): Time | null {
    const match = /^T?(\d{2})(?::?(\d{2})(?::?(\d{2}(?:\.\d*)?))?)?$/iu.exec(text);
    if (match?.[1] == null) {
        return null;
    }

    const hours = parseInt(match[1], 10);
    const minutes = mapOptional(match[2], text => parseInt(text, 10)) ?? 0;
    const seconds = mapOptional(match[3], text => parseFloat(text.replace(",", "."))) ?? 0;

    return {type: "Time", hours, minutes, seconds};
}

/**
 * Parses a {@link Time} from text in ISO 8601 format.
 *
 * The ISO 8601 text must not specify a time zone offset.
 *
 * If the specified text is not a valid ISO 8601 time then this function
 * returns `null`.
 *
 * Both extended `Thh:mm:ss.sss` and basic `Thhmmss.sss` ISO 8601 formats are
 * accepted, and the initial `T` is optional in both cases. The seconds field
 * may be omitted, and the minutes field may also be omitted if the seconds
 * field is omitted. Omitted fields default to zero.
 *
 * Alias of {@link parseIso8601}, useful for disambiguation from similar
 * functions that operate on other date/time types. */
export const parseTimeIso8601 = parseIso8601;

export type {Iso8601Options, TimeFormatter} from "@softwareventures/format-time";

/** Returns a {@link TimeFormatter} that formats the specified {@link Time} as
 * ISO 8601, with the specified options.
 *
 * By default, the {@link Time} is formatted in the "extended" ISO 8601 format,
 * with the leading `"T"`, and without rounding, for example
 * `"T11:57:23.723615"`.
 *
 * If the `format` option is set to `"basic"`, then the colons are omitted,
 * for example `"T115723.723615"`.
 *
 * If the `round` option is set to `"seconds"`, then the time is rounded down
 * to the next lower second, for example `"T11:57:23"`.
 *
 * If the `round` option is set to `"ms"`, then the time is rounded down to
 * the next lower millisecond, for example `"T11:57:23.723"`.
 *
 * If the `leadingT` option is set to `false`, then the leading `"T"` is
 * omitted, for example `"11:57:23.363215"`.
 *
 * For other formats, see `@softwareventures/format-time`. */
export const formatIso8601 = format.iso8601;

/** Returns a {@link TimeFormatter} that formats the specified {@link Time} as
 * ISO 8601, with the specified options.
 *
 * By default, the {@link Time} is formatted in the "extended" ISO 8601 format,
 * with the leading `"T"`, and without rounding, for example
 * `"T11:57:23.723615"`.
 *
 * If the `format` option is set to `"basic"`, then the colons are omitted,
 * for example `"T115723.723615"`.
 *
 * If the `round` option is set to `"seconds"`, then the time is rounded down
 * to the next lower second, for example `"T11:57:23"`.
 *
 * If the `round` option is set to `"ms"`, then the time is rounded down to
 * the next lower millisecond, for example `"T11:57:23.723"`.
 *
 * If the `leadingT` option is set to `false`, then the leading `"T"` is
 * omitted, for example `"11:57:23.363215"`.
 *
 * Alias of {@link formatIso8601}, useful for disambiguation from similar
 * functions that operate on other date/time types.
 *
 * For other formats, see `@softwareventures/format-time`. */
export const formatTimeIso8601 = format.iso8601;

/** Formats the specified {@link Time} as ISO 8601 extended, rounded down to
 * the next lower second, and with no leading `"T"`.
 *
 * This format is intended to be reasonable for display to humans. */
export const formatHumanIso8601 = format.humanIso8601;

/** Formats the specified {@link Time} as ISO 8601 extended, rounded down to
 * the next lower second, and with no leading `"T"`.
 *
 * This format is intended to be reasonable for display to humans.
 *
 * Alias of {@link formatHumanIso8601}, useful for disambiguation from similar
 * functions that operate on other date/time types. */
export const formatTimeHumanIso8601 = format.humanIso8601;
