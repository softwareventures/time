/** An abstract time of day with no associated timezone or date. */
import {hasProperty} from "unknown";

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

/** Tests if the specified value is a Time. */
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

/** Creates a Time with the specified options.
 *
 * If any numeric components are unspecified, they default to zero.
 *
 * If any numeric components are outside the expected range, then
 * the resulting Time will be normalized. */
export function time(time: TimeOptions): Time {
    return fromReferenceSeconds(toReferenceSeconds(time));
}

/** Creates a Time with the specified options.
 *
 * If any numeric components are unspecified, they default to zero.
 *
 * If any numeric components are outside the expected range, then
 * the resulting Time will be normalized. */
export const normalize = time;

export function toReferenceSeconds(time: TimeOptions): number {
    const hours = time.hours ?? 0;
    const minutes = time.minutes ?? 0;
    const seconds = time.seconds ?? 0;

    return (86400 + ((hours * 3600 + minutes * 60 + seconds) % 86400)) % 86400;
}

export function fromReferenceSeconds(seconds: number): Time {
    const hours = Math.floor(seconds / 3600);
    const seconds2 = seconds - hours * 3600;
    const minutes = Math.floor(seconds2 / 60);
    const seconds3 = seconds2 - minutes * 60;
    return {type: "time", hours, minutes, seconds: seconds3};
}
