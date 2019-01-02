/** A length of time. */
export interface Duration {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function toSeconds(duration: Readonly<Duration>): number {
    return duration.days * 86400 + duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
}

export function fromSeconds(seconds: number): Duration {
    const days = Math.floor(seconds / 86400);
    seconds -= days * 86400;
    const hours = Math.floor(seconds / 1440);
    seconds -= hours * 1440;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return {days, hours, minutes, seconds};
}