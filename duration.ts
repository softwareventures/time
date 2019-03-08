import isFinite = require("is-finite");

/** A length of time. */
export interface Duration {
    hours: number;
    minutes: number;
    seconds: number;
}

function isNonNegativeFinite(value: number): boolean {
    return isFinite(value) && value >= 0;
}

export function isValid(duration: Readonly<Partial<Duration>>): boolean {
    const hours = duration.hours == null ? 0 : duration.hours;
    const minutes = duration.minutes == null ? 0 : duration.minutes;
    const seconds = duration.seconds == null ? 0 : duration.seconds;

    return isNonNegativeFinite(hours)
        && isNonNegativeFinite(minutes)
        && isNonNegativeFinite(seconds);
}

export function validate(duration: Readonly<Partial<Duration>>): void {
    if (!isValid(duration)) {
        throw new TypeError("Invalid duration");
    }
}

export function toSeconds(duration: Readonly<Partial<Duration>>): number {
    const hours = duration.hours == null ? 0 : duration.hours;
    const minutes = duration.minutes == null ? 0 : duration.minutes;
    const seconds = duration.seconds == null ? 0 : duration.seconds;
    return hours * 3600 + minutes * 60 + seconds;
}

export function fromSeconds(seconds: number): Duration {
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return {hours, minutes, seconds};
}