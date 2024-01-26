import test from "ava";
import {fromReferenceSeconds, parseIso8601} from ".";

test("fromReferenceSeconds", t => {
    t.deepEqual(fromReferenceSeconds(0), {type: "Time", hours: 0, minutes: 0, seconds: 0});
    t.deepEqual(fromReferenceSeconds(0.1), {type: "Time", hours: 0, minutes: 0, seconds: 0.1});
    t.deepEqual(fromReferenceSeconds(59), {type: "Time", hours: 0, minutes: 0, seconds: 59});
    t.deepEqual(fromReferenceSeconds(60), {type: "Time", hours: 0, minutes: 1, seconds: 0});
    t.deepEqual(fromReferenceSeconds(60.25), {type: "Time", hours: 0, minutes: 1, seconds: 0.25});
    t.deepEqual(fromReferenceSeconds(119.95), {type: "Time", hours: 0, minutes: 1, seconds: 59.95});
    t.deepEqual(fromReferenceSeconds(121), {type: "Time", hours: 0, minutes: 2, seconds: 1});
    t.deepEqual(fromReferenceSeconds(3599), {type: "Time", hours: 0, minutes: 59, seconds: 59});
    t.deepEqual(fromReferenceSeconds(3600), {type: "Time", hours: 1, minutes: 0, seconds: 0});
    t.deepEqual(fromReferenceSeconds(3600.125), {
        type: "Time",
        hours: 1,
        minutes: 0,
        seconds: 0.125
    });
    t.deepEqual(fromReferenceSeconds(7199.96875), {
        type: "Time",
        hours: 1,
        minutes: 59,
        seconds: 59.96875
    });
    t.deepEqual(fromReferenceSeconds(7244), {type: "Time", hours: 2, minutes: 0, seconds: 44});
    t.deepEqual(fromReferenceSeconds(49407), {type: "Time", hours: 13, minutes: 43, seconds: 27});
});

test("parseIso8601", t => {
    t.deepEqual(parseIso8601("10"), {type: "Time", hours: 10, minutes: 0, seconds: 0});
    t.deepEqual(parseIso8601("T14"), {type: "Time", hours: 14, minutes: 0, seconds: 0});
    t.deepEqual(parseIso8601("1125"), {type: "Time", hours: 11, minutes: 25, seconds: 0});
    t.deepEqual(parseIso8601("18:32"), {type: "Time", hours: 18, minutes: 32, seconds: 0});
    t.deepEqual(parseIso8601("213312"), {type: "Time", hours: 21, minutes: 33, seconds: 12});
    t.deepEqual(parseIso8601("00:23:58"), {type: "Time", hours: 0, minutes: 23, seconds: 58});
    t.deepEqual(parseIso8601("14:09:33.632"), {
        type: "Time",
        hours: 14,
        minutes: 9,
        seconds: 33.632
    });
    t.deepEqual(parseIso8601("012903.5"), {type: "Time", hours: 1, minutes: 29, seconds: 3.5});
});
