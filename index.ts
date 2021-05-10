/** An abstract time of day with no associated timezone or date. */
export interface Time {
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

export function normalize(time: Time): Time {
    return fromReferenceSeconds(toReferenceSeconds(time));
}

export function toReferenceSeconds(time: Time): number {
    return (86400 + ((time.hours * 3600 + time.minutes * 60 + time.seconds) % 86400)) % 86400;
}

export function fromReferenceSeconds(seconds: number): Time {
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return {hours, minutes, seconds};
}
