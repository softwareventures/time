import test from "ava";
import {fromReferenceDays, toReferenceDays} from "./date";

test("toReferenceDays({year: -400})", t => t.is(toReferenceDays({year: -400}), -146463));
test("toReferenceDays({year: -100})", t => t.is(toReferenceDays({year: -100}), -36890));
test("toReferenceDays({year: -99})", t => t.is(toReferenceDays({year: -99}), -36525));
test("toReferenceDays({year: -4})", t => t.is(toReferenceDays({year: -4}), -1827));
test("toReferenceDays({year: -3})", t => t.is(toReferenceDays({year: -3}), -1461));
test("toReferenceDays({year: -2})", t => t.is(toReferenceDays({year: -2}), -1096));
test("toReferenceDays({year: -1})", t => t.is(toReferenceDays({year: -1}), -731));
test("toReferenceDays({year: 0})", t => t.is(toReferenceDays({year: 0}), -366));
test("toReferenceDays({year: 0, month: 1})", t => t.is(toReferenceDays({year: 0, month: 1}), -366));
test("toReferenceDays({year: 0, month: 2})", t => t.is(toReferenceDays({year: 0, month: 2}), -335));
test("toReferenceDays({year: 0, month: 3})", t => t.is(toReferenceDays({year: 0, month: 3}), -306));
test("toReferenceDays({year: 0, month: 3, day: 2})", t => t.is(toReferenceDays({year: 0, month: 3, day: 2}), -305));
test("toReferenceDays({year: 1, month: 0})", t => t.is(toReferenceDays({year: 1, month: 0}), -31));
test("toReferenceDays({})", t => t.is(toReferenceDays({}), 0));
test("toReferenceDays({month: 1})", t => t.is(toReferenceDays({month: 1}), 0));
test("toReferenceDays({day: 1})", t => t.is(toReferenceDays({day: 1}), 0));
test("toReferenceDays({year: 1, month: 1, day: 1})", t => t.is(toReferenceDays({year: 1, month: 1, day: 1}), 0));
test("toReferenceDays({day: 2})", t => t.is(toReferenceDays({day: 2}), 1));
test("toReferenceDays({year: 1, month: 1, day: 2})", t => t.is(toReferenceDays({year: 1, month: 1, day: 2}), 1));
test("toReferenceDays({month: 1, day: 3})", t => t.is(toReferenceDays({month: 1, day: 3}), 2));
test("toReferenceDays({year: 1, day: 4})", t => t.is(toReferenceDays({year: 1, day: 4}), 3));
test("toReferenceDays({year: 1, month: 1, day: 31})", t => t.is(toReferenceDays({year: 1, month: 1, day: 31}), 30));
test("toReferenceDays({month: 2})", t => t.is(toReferenceDays({month: 2}), 31));
test("toReferenceDays({day: 32})", t => t.is(toReferenceDays({day: 32}), 31));
test("toReferenceDays({year: 1, month: 2, day: 1})", t => t.is(toReferenceDays({year: 1, month: 2, day: 1}), 31));
test("toReferenceDays({year: 1, month: 2, day: 28})", t => t.is(toReferenceDays({year: 1, month: 2, day: 28}), 58));
test("toReferenceDays({month: 3, day: -1})", t => t.is(toReferenceDays({month: 3, day: -1}), 57));
test("toReferenceDays({month: 2, day: 29})", t => t.is(toReferenceDays({month: 2, day: 29}), 59));
test("toReferenceDays({year: 1, month: 3, day: 1})", t => t.is(toReferenceDays({year: 1, month: 3, day: 1}), 59));
test("toReferenceDays({month: 3})", t => t.is(toReferenceDays({month: 3}), 59));
test("toReferenceDays({month: 4})", t => t.is(toReferenceDays({month: 4}), 90));
test("toReferenceDays({month: 5})", t => t.is(toReferenceDays({month: 5}), 120));
test("toReferenceDays({month: 6})", t => t.is(toReferenceDays({month: 6}), 151));
test("toReferenceDays({month: 7})", t => t.is(toReferenceDays({month: 7}), 181));
test("toReferenceDays({month: 8})", t => t.is(toReferenceDays({month: 8}), 212));
test("toReferenceDays({month: 9})", t => t.is(toReferenceDays({month: 9}), 243));
test("toReferenceDays({month: 10})", t => t.is(toReferenceDays({month: 10}), 273));
test("toReferenceDays({month: 11})", t => t.is(toReferenceDays({month: 11}), 304));
test("toReferenceDays({month: 12})", t => t.is(toReferenceDays({month: 12}), 334));
test("toReferenceDays({month: 13})", t => t.is(toReferenceDays({month: 13}), 365));
test("toReferenceDays({year: 2})", t => t.is(toReferenceDays({year: 2}), 365));
test("toReferenceDays({month: 14})", t => t.is(toReferenceDays({month: 14}), 396));
test("toReferenceDays({year: 2, month: 2})", t => t.is(toReferenceDays({year: 2, month: 2}), 396));
test("toReferenceDays({month: 15})", t => t.is(toReferenceDays({month: 15}), 424));
test("toReferenceDays({month: 16})", t => t.is(toReferenceDays({month: 16}), 455));
test("toReferenceDays({month: 17})", t => t.is(toReferenceDays({month: 17}), 485));
test("toReferenceDays({month: 18})", t => t.is(toReferenceDays({month: 18}), 516));
test("toReferenceDays({month: 19})", t => t.is(toReferenceDays({month: 19}), 546));
test("toReferenceDays({month: 20})", t => t.is(toReferenceDays({month: 20}), 577));
test("toReferenceDays({month: 21})", t => t.is(toReferenceDays({month: 21}), 608));
test("toReferenceDays({month: 22})", t => t.is(toReferenceDays({month: 22}), 638));
test("toReferenceDays({month: 23})", t => t.is(toReferenceDays({month: 23}), 669));
test("toReferenceDays({month: 24})", t => t.is(toReferenceDays({month: 24}), 699));
test("toReferenceDays({month: 25})", t => t.is(toReferenceDays({month: 25}), 730));
test("toReferenceDays({year: 2, month: 13})", t => t.is(toReferenceDays({year: 2, month: 13}), 730));
test("toReferenceDays({month: 26})", t => t.is(toReferenceDays({month: 26}), 761));
test("toReferenceDays({year: 4, month: -10})", t => t.is(toReferenceDays({year: 4, month: -10}), 761));
test("toReferenceDays({month: 27})", t => t.is(toReferenceDays({month: 27}), 789));
test("toReferenceDays({month: 28})", t => t.is(toReferenceDays({month: 28}), 820));
test("toReferenceDays({month: 29})", t => t.is(toReferenceDays({month: 29}), 850));
test("toReferenceDays({month: 30})", t => t.is(toReferenceDays({month: 30}), 881));
test("toReferenceDays({month: 31})", t => t.is(toReferenceDays({month: 31}), 911));
test("toReferenceDays({month: 32})", t => t.is(toReferenceDays({month: 32}), 942));
test("toReferenceDays({month: 33})", t => t.is(toReferenceDays({month: 33}), 973));
test("toReferenceDays({month: 34})", t => t.is(toReferenceDays({month: 34}), 1003));
test("toReferenceDays({month: 35})", t => t.is(toReferenceDays({month: 35}), 1034));
test("toReferenceDays({month: 36})", t => t.is(toReferenceDays({month: 36}), 1064));
test("toReferenceDays({month: 37})", t => t.is(toReferenceDays({month: 37}), 1095));
test("toReferenceDays({month: 38})", t => t.is(toReferenceDays({month: 38}), 1126));
test("toReferenceDays({year: 4, month: 2})", t => t.is(toReferenceDays({year: 4, month: 2}), 1126));
test("toReferenceDays({year: 4, month: 2, day: 29})", t => t.is(toReferenceDays({year: 4, month: 2, day: 29}), 1154));
test("toReferenceDays({year: 4, month: 3, day: 1})", t => t.is(toReferenceDays({year: 4, month: 3, day: 1}), 1155));
test("toReferenceDays({month: 39})", t => t.is(toReferenceDays({month: 39}), 1155));
test("toReferenceDays({month: 40})", t => t.is(toReferenceDays({month: 40}), 1186));
test("toReferenceDays({month: 41})", t => t.is(toReferenceDays({month: 41}), 1216));
test("toReferenceDays({month: 42})", t => t.is(toReferenceDays({month: 42}), 1247));
test("toReferenceDays({month: 43})", t => t.is(toReferenceDays({month: 43}), 1277));
test("toReferenceDays({month: 44})", t => t.is(toReferenceDays({month: 44}), 1308));
test("toReferenceDays({month: 45})", t => t.is(toReferenceDays({month: 45}), 1339));
test("toReferenceDays({month: 46})", t => t.is(toReferenceDays({month: 46}), 1369));
test("toReferenceDays({month: 47})", t => t.is(toReferenceDays({month: 47}), 1400));
test("toReferenceDays({month: 48})", t => t.is(toReferenceDays({month: 48}), 1430));
test("toReferenceDays({month: 49})", t => t.is(toReferenceDays({month: 49}), 1461));
test("toReferenceDays({month: 50})", t => t.is(toReferenceDays({month: 50}), 1492));
test("toReferenceDays({month: 1188})", t => t.is(toReferenceDays({month: 1188}), 36128));
test("toReferenceDays({month: 1189})", t => t.is(toReferenceDays({month: 1189}), 36159));
test("toReferenceDays({month: 1190})", t => t.is(toReferenceDays({month: 1190}), 36190));
test("toReferenceDays({month: 1191})", t => t.is(toReferenceDays({month: 1191}), 36218));
test("toReferenceDays({month: 1192})", t => t.is(toReferenceDays({month: 1192}), 36249));
test("toReferenceDays({month: 1200})", t => t.is(toReferenceDays({month: 1200}), 36493));
test("toReferenceDays({month: 1201})", t => t.is(toReferenceDays({month: 1201}), 36524));
test("toReferenceDays({month: 1202})", t => t.is(toReferenceDays({month: 1202}), 36555));
test("toReferenceDays({month: 1203})", t => t.is(toReferenceDays({month: 1203}), 36583));
test("toReferenceDays({month: 1204})", t => t.is(toReferenceDays({month: 1204}), 36614));
test("toReferenceDays({month: 1213})", t => t.is(toReferenceDays({month: 1213}), 36889));
test("toReferenceDays({month: 4788})", t => t.is(toReferenceDays({month: 4788}), 145700));
test("toReferenceDays({month: 4789})", t => t.is(toReferenceDays({month: 4789}), 145731));
test("toReferenceDays({month: 4790})", t => t.is(toReferenceDays({month: 4790}), 145762));
test("toReferenceDays({month: 4791})", t => t.is(toReferenceDays({month: 4791}), 145791));
test("toReferenceDays({month: 4792})", t => t.is(toReferenceDays({month: 4792}), 145822));
test("toReferenceDays({month: 4800})", t => t.is(toReferenceDays({month: 4800}), 146066));
test("toReferenceDays({month: 4801})", t => t.is(toReferenceDays({month: 4801}), 146097));
test("toReferenceDays({month: 4802})", t => t.is(toReferenceDays({month: 4802}), 146128));
test("toReferenceDays({month: 4803})", t => t.is(toReferenceDays({month: 4803}), 146156));

test("fromReferenceDays(0)", t => t.deepEqual(fromReferenceDays(0), {year: 1, month: 1, day: 1}));
test("fromReferenceDays(1)", t => t.deepEqual(fromReferenceDays(1), {year: 1, month: 1, day: 2}));
test("fromReferenceDays(30)", t => t.deepEqual(fromReferenceDays(30), {year: 1, month: 1, day: 31}));
test("fromReferenceDays(31)", t => t.deepEqual(fromReferenceDays(31), {year: 1, month: 2, day: 1}));
test("fromReferenceDays(58)", t => t.deepEqual(fromReferenceDays(58), {year: 1, month: 2, day: 28}));
test("fromReferenceDays(59)", t => t.deepEqual(fromReferenceDays(59), {year: 1, month: 3, day: 1}));
