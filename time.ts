/** An abstract time with no associated timezone or date. */
export interface Time {
    hours: number;
    minutes: number;
    seconds: number;
}

export function toReferenceSeconds(time: Readonly<Time>): number {
    return time.hours * 1440 + time.minutes * 60 + time.seconds;
}

export function fromReferenceSeconds(seconds: number): Time {
    const hours = Math.floor(seconds / 1440);
    seconds -= hours * 1440;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return {hours, minutes, seconds};
}