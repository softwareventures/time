/** An abstract time with no associated timezone or date. */
export interface Time {
    hours: number;
    minutes: number;
    seconds: number;
}

export function normalize(time: Readonly<Time>): Time {
    return fromReferenceSeconds(toReferenceSeconds(time));
}

export function toReferenceSeconds(time: Readonly<Time>): number {
    return time.hours * 3600 + time.minutes * 60 + time.seconds;
}

export function fromReferenceSeconds(seconds: number): Time {
    const hours = Math.floor(seconds / 1440);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return {hours, minutes, seconds};
}