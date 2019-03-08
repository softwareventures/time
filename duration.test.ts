import test from "ava";
import {fromSeconds, isValid, toSeconds} from "./duration";

test("isValid", t => {
    t.true(isValid({}));
    t.true(isValid({seconds: 0}));
    t.true(isValid({seconds: 0.5}));
    t.false(isValid({seconds: -1}));
    t.true(isValid({seconds: 61}));
    t.true(isValid({minutes: 0}));
    t.true(isValid({minutes: 0.5}));
    t.false(isValid({minutes: -1}));
    t.true(isValid({minutes: 61}));
    t.true(isValid({hours: 0}));
    t.true(isValid({hours: 0.5}));
    t.false(isValid({hours: -1}));
    t.true(isValid({hours: 25}));
    t.true(isValid({minutes: 1.5, seconds: 2}));
    t.true(isValid({hours: 2.25, minutes: 0.5, seconds: 3}));
    t.false(isValid({minutes: 1, seconds: -3}));
    t.false(isValid({hours: -1, minutes: 8, seconds: 4}));
});

test("toSeconds", t => {
    t.is(toSeconds({}), 0);
    t.is(toSeconds({seconds: 80}), 80);
    t.is(toSeconds({minutes: 3}), 180);
    t.is(toSeconds({minutes: 1.5, seconds: 2}), 92);
    t.is(toSeconds({hours: 2}), 7200);
    t.is(toSeconds({hours: 2.25, minutes: 0.5, seconds: 3}), 8133);
    t.is(toSeconds({seconds: -5}), -5);
    t.is(toSeconds({minutes: 1, seconds: -3}), 57);
    t.is(toSeconds({hours: -1, minutes: 8, seconds: 4}), -3116);
});

test("fromSeconds", t => {
    t.deepEqual(fromSeconds(0), {hours: 0, minutes: 0, seconds: 0});
    t.deepEqual(fromSeconds(80), {hours: 0, minutes: 1, seconds: 20});
    t.deepEqual(fromSeconds(180), {hours: 0, minutes: 3, seconds: 0});
    t.deepEqual(fromSeconds(92), {hours: 0, minutes: 1, seconds: 32});
    t.deepEqual(fromSeconds(7200), {hours: 2, minutes: 0, seconds: 0});
    t.deepEqual(fromSeconds(8133), {hours: 2, minutes: 15, seconds: 33});
    t.deepEqual(fromSeconds(-5), {hours: -1, minutes: 59, seconds: 55});
    t.deepEqual(fromSeconds(57), {hours: 0, minutes: 0, seconds: 57});
    t.deepEqual(fromSeconds(-3116), {hours: -1, minutes: 8, seconds: 4});
});