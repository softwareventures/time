import test from "ava";
import {fromReferenceSeconds} from ".";

test("fromReferenceSeconds", t => {
    t.deepEqual(fromReferenceSeconds(0), {hours: 0, minutes: 0, seconds: 0});
    t.deepEqual(fromReferenceSeconds(0.1), {hours: 0, minutes: 0, seconds: 0.1});
    t.deepEqual(fromReferenceSeconds(59), {hours: 0, minutes: 0, seconds: 59});
    t.deepEqual(fromReferenceSeconds(60), {hours: 0, minutes: 1, seconds: 0});
    t.deepEqual(fromReferenceSeconds(60.25), {hours: 0, minutes: 1, seconds: 0.25});
    t.deepEqual(fromReferenceSeconds(119.95), {hours: 0, minutes: 1, seconds: 59.95});
    t.deepEqual(fromReferenceSeconds(121), {hours: 0, minutes: 2, seconds: 1});
    t.deepEqual(fromReferenceSeconds(3599), {hours: 0, minutes: 59, seconds: 59});
    t.deepEqual(fromReferenceSeconds(3600), {hours: 1, minutes: 0, seconds: 0});
    t.deepEqual(fromReferenceSeconds(3600.125), {hours: 1, minutes: 0, seconds: 0.125});
    t.deepEqual(fromReferenceSeconds(7199.96875), {hours: 1, minutes: 59, seconds: 59.96875});
    t.deepEqual(fromReferenceSeconds(7244), {hours: 2, minutes: 0, seconds: 44});
    t.deepEqual(fromReferenceSeconds(49407), {hours: 13, minutes: 43, seconds: 27});
});
