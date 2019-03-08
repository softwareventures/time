import test from "ava";
import {fromSeconds, isValid, toSeconds} from "./duration";

// tslint:disable:max-line-length

test("isValid({})", t => t.true(isValid({})));
test("isValid({seconds: 0})", t => t.true(isValid({seconds: 0})));
test("isValid({seconds: 0.5})", t => t.true(isValid({seconds: 0.5})));
test("isValid({seconds: -1})", t => t.false(isValid({seconds: -1})));
test("isValid({seconds: 61})", t => t.true(isValid({seconds: 61})));
test("isValid({minutes: 0})", t => t.true(isValid({minutes: 0})));
test("isValid({minutes: 0.5})", t => t.true(isValid({minutes: 0.5})));
test("isValid({minutes: -1})", t => t.false(isValid({minutes: -1})));
test("isValid({minutes: 61})", t => t.true(isValid({minutes: 61})));
test("isValid({hours: 0})", t => t.true(isValid({hours: 0})));
test("isValid({hours: 0.5})", t => t.true(isValid({hours: 0.5})));
test("isValid({hours: -1})", t => t.false(isValid({hours: -1})));
test("isValid({hours: 25})", t => t.true(isValid({hours: 25})));
test("isValid({minutes: 1.5, seconds: 2})", t => t.true(isValid({minutes: 1.5, seconds: 2})));
test("isValid({hours: 2.25, minutes: 0.5, seconds: 3})", t => t.true(isValid({hours: 2.25, minutes: 0.5, seconds: 3})));
test("isValid({minutes: 1, seconds: -3})", t => t.false(isValid({minutes: 1, seconds: -3})));
test("isValid({hours: -1, minutes: 8, seconds: 4})", t => t.false(isValid({hours: -1, minutes: 8, seconds: 4})));

test("toSeconds({})", t => t.is(toSeconds({}), 0));
test("toSeconds({seconds: 80})", t => t.is(toSeconds({seconds: 80}), 80));
test("toSeconds({minutes: 3})", t => t.is(toSeconds({minutes: 3}), 180));
test("toSeconds({minutes: 1.5, seconds: 2})", t => t.is(toSeconds({minutes: 1.5, seconds: 2}), 92));
test("toSeconds({hours: 2})", t => t.is(toSeconds({hours: 2}), 7200));
test("toSeconds({hours: 2.25, minutes: 0.5, seconds: 3})", t => t.is(toSeconds({hours: 2.25, minutes: 0.5, seconds: 3}), 8133));
test("toSeconds({seconds: -5})", t => t.is(toSeconds({seconds: -5}), -5));
test("toSeconds({minutes: 1, seconds: -3})", t => t.is(toSeconds({minutes: 1, seconds: -3}), 57));
test("toSeconds({hours: -1, minutes: 8, seconds: 4})", t => t.is(toSeconds({hours: -1, minutes: 8, seconds: 4}), -3116));

test("fromSeconds(0)", t => t.deepEqual(fromSeconds(0), {hours: 0, minutes: 0, seconds: 0}));
test("fromSeconds(80)", t => t.deepEqual(fromSeconds(80), {hours: 0, minutes: 1, seconds: 20}));
test("fromSeconds(180)", t => t.deepEqual(fromSeconds(180), {hours: 0, minutes: 3, seconds: 0}));
test("fromSeconds(92)", t => t.deepEqual(fromSeconds(92), {hours: 0, minutes: 1, seconds: 32}));
test("fromSeconds(7200)", t => t.deepEqual(fromSeconds(7200), {hours: 2, minutes: 0, seconds: 0}));
test("fromSeconds(8133)", t => t.deepEqual(fromSeconds(8133), {hours: 2, minutes: 15, seconds: 33}));
test("fromSeconds(-5)", t => t.deepEqual(fromSeconds(-5), {hours: -1, minutes: 59, seconds: 55}));
test("fromSeconds(57)", t => t.deepEqual(fromSeconds(57), {hours: 0, minutes: 0, seconds: 57}));
test("fromSeconds(-3116)", t => t.deepEqual(fromSeconds(-3116), {hours: -1, minutes: 8, seconds: 4}));