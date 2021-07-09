import test from "ava";
import {fromReferenceSeconds} from ".";

test("fromReferenceSeconds", t => {
    t.deepEqual(fromReferenceSeconds(0), {type: "time", hours: 0, minutes: 0, seconds: 0});
    t.deepEqual(fromReferenceSeconds(0.1), {type: "time", hours: 0, minutes: 0, seconds: 0.1});
    t.deepEqual(fromReferenceSeconds(59), {type: "time", hours: 0, minutes: 0, seconds: 59});
    t.deepEqual(fromReferenceSeconds(60), {type: "time", hours: 0, minutes: 1, seconds: 0});
    t.deepEqual(fromReferenceSeconds(60.25), {type: "time", hours: 0, minutes: 1, seconds: 0.25});
    t.deepEqual(fromReferenceSeconds(119.95), {type: "time", hours: 0, minutes: 1, seconds: 59.95});
    t.deepEqual(fromReferenceSeconds(121), {type: "time", hours: 0, minutes: 2, seconds: 1});
    t.deepEqual(fromReferenceSeconds(3599), {type: "time", hours: 0, minutes: 59, seconds: 59});
    t.deepEqual(fromReferenceSeconds(3600), {type: "time", hours: 1, minutes: 0, seconds: 0});
    t.deepEqual(fromReferenceSeconds(3600.125), {type: "time", hours: 1, minutes: 0, seconds: 0.125});
    t.deepEqual(fromReferenceSeconds(7199.96875), {type: "time", hours: 1, minutes: 59, seconds: 59.96875});
    t.deepEqual(fromReferenceSeconds(7244), {type: "time", hours: 2, minutes: 0, seconds: 44});
    t.deepEqual(fromReferenceSeconds(49407), {type: "time", hours: 13, minutes: 43, seconds: 27});
});
