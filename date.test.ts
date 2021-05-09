import test from "ava";
import {fromReferenceDays, isValid, toReferenceDays} from "./date";

test("isValid", t => {
    t.false(isValid({year: 0, month: 0, day: 0}));
    t.false(isValid({year: 0, month: 0, day: 1}));
    t.false(isValid({year: 0, month: 1, day: 0}));
    t.true(isValid({year: 0, month: 1, day: 1}));
    t.false(isValid({year: 1, month: 0, day: 0}));
    t.false(isValid({year: 1, month: 0, day: 1}));
    t.false(isValid({year: 1, month: 1, day: 0}));
    t.true(isValid({year: 1, month: 1, day: 1}));
    t.true(isValid({year: -1, month: 1, day: 1}));
    t.false(isValid({year: 1, month: 1, day: 1.5}));
    t.false(isValid({year: 1, month: 1.5, day: 1}));
    t.false(isValid({year: 1.5, month: 1, day: 1}));
    t.true(isValid({year: 1, month: 1, day: 31}));
    t.false(isValid({year: 1, month: 1, day: 32}));
    t.false(isValid({year: 1, month: 2, day: 0}));
    t.true(isValid({year: 1, month: 2, day: 1}));
    t.true(isValid({year: 1, month: 2, day: 28}));
    t.false(isValid({year: 1, month: 2, day: 29}));
    t.true(isValid({year: 1, month: 3, day: 1}));
    t.true(isValid({year: 1, month: 3, day: 31}));
    t.false(isValid({year: 1, month: 3, day: 32}));
    t.true(isValid({year: 1, month: 4, day: 1}));
    t.true(isValid({year: 1, month: 4, day: 30}));
    t.false(isValid({year: 1, month: 4, day: 31}));
    t.true(isValid({year: 1, month: 5, day: 31}));
    t.false(isValid({year: 1, month: 5, day: 32}));
    t.true(isValid({year: 1, month: 6, day: 30}));
    t.false(isValid({year: 1, month: 6, day: 31}));
    t.true(isValid({year: 1, month: 7, day: 31}));
    t.false(isValid({year: 1, month: 7, day: 32}));
    t.true(isValid({year: 1, month: 8, day: 31}));
    t.false(isValid({year: 1, month: 8, day: 32}));
    t.true(isValid({year: 1, month: 9, day: 30}));
    t.false(isValid({year: 1, month: 9, day: 31}));
    t.true(isValid({year: 1, month: 10, day: 31}));
    t.false(isValid({year: 1, month: 10, day: 32}));
    t.true(isValid({year: 1, month: 11, day: 30}));
    t.false(isValid({year: 1, month: 11, day: 31}));
    t.true(isValid({year: 1, month: 12, day: 31}));
    t.false(isValid({year: 1, month: 12, day: 32}));
    t.true(isValid({year: 2, month: 2, day: 1}));
    t.true(isValid({year: 2, month: 2, day: 28}));
    t.false(isValid({year: 2, month: 2, day: 29}));
    t.true(isValid({year: 3, month: 2, day: 1}));
    t.true(isValid({year: 3, month: 2, day: 28}));
    t.false(isValid({year: 3, month: 2, day: 29}));
    t.true(isValid({year: 4, month: 2, day: 1}));
    t.true(isValid({year: 4, month: 2, day: 28}));
    t.true(isValid({year: 4, month: 2, day: 29}));
    t.false(isValid({year: 4, month: 2, day: 30}));
    t.true(isValid({year: 5, month: 2, day: 28}));
    t.false(isValid({year: 5, month: 2, day: 29}));
    t.true(isValid({year: 7, month: 2, day: 28}));
    t.false(isValid({year: 7, month: 2, day: 29}));
    t.true(isValid({year: 8, month: 2, day: 28}));
    t.true(isValid({year: 8, month: 2, day: 29}));
    t.false(isValid({year: 8, month: 2, day: 30}));
    t.true(isValid({year: 99, month: 2, day: 28}));
    t.false(isValid({year: 99, month: 2, day: 29}));
    t.true(isValid({year: 100, month: 2, day: 28}));
    t.false(isValid({year: 100, month: 2, day: 29}));
    t.true(isValid({year: 399, month: 2, day: 28}));
    t.false(isValid({year: 399, month: 2, day: 29}));
    t.true(isValid({year: 400, month: 2, day: 28}));
    t.true(isValid({year: 400, month: 2, day: 29}));
    t.false(isValid({year: 400, month: 2, day: 30}));
    t.true(isValid({year: 0, month: 2, day: 28}));
    t.true(isValid({year: 0, month: 2, day: 29}));
    t.false(isValid({year: 0, month: 2, day: 30}));
    t.true(isValid({year: -4, month: 2, day: 28}));
    t.true(isValid({year: -4, month: 2, day: 29}));
    t.false(isValid({year: -4, month: 2, day: 30}));
    t.true(isValid({year: -100, month: 2, day: 28}));
    t.false(isValid({year: -100, month: 2, day: 29}));
    t.true(isValid({year: -400, month: 2, day: 28}));
    t.true(isValid({year: -400, month: 2, day: 29}));
    t.false(isValid({year: -400, month: 2, day: 30}));
});

test("toReferenceDays", t => {
    t.is(toReferenceDays({year: -400}), -146463);
    t.is(toReferenceDays({year: -400, month: 1, day: 1}), -146463);
    t.is(toReferenceDays({year: -400, month: 2, day: 28}), -146405);
    t.is(toReferenceDays({year: -400, month: 2, day: 29}), -146404);
    t.is(toReferenceDays({year: -400, month: 3, day: 1}), -146403);
    t.is(toReferenceDays({year: -400, month: 12, day: 31}), -146098);
    t.is(toReferenceDays({year: -399, month: 1, day: 1}), -146097);
    t.is(toReferenceDays({year: -100}), -36890);
    t.is(toReferenceDays({year: -100, month: 1, day: 1}), -36890);
    t.is(toReferenceDays({year: -100, month: 1, day: 31}), -36860);
    t.is(toReferenceDays({year: -100, month: 2, day: 1}), -36859);
    t.is(toReferenceDays({year: -100, month: 2, day: 28}), -36832);
    t.is(toReferenceDays({year: -100, month: 3, day: 1}), -36831);
    t.is(toReferenceDays({year: -99}), -36525);
    t.is(toReferenceDays({year: -99, month: 1, day: 1}), -36525);
    t.is(toReferenceDays({year: -4}), -1827);
    t.is(toReferenceDays({year: -4, month: 1, day: 1}), -1827);
    t.is(toReferenceDays({year: -4, month: 2, day: 28}), -1769);
    t.is(toReferenceDays({year: -4, month: 2, day: 29}), -1768);
    t.is(toReferenceDays({year: -4, month: 3, day: 1}), -1767);
    t.is(toReferenceDays({year: -3}), -1461);
    t.is(toReferenceDays({year: -3, month: 1, day: 1}), -1461);
    t.is(toReferenceDays({year: -2}), -1096);
    t.is(toReferenceDays({year: -2, month: 1, day: 1}), -1096);
    t.is(toReferenceDays({year: -1}), -731);
    t.is(toReferenceDays({year: -1, month: 1, day: 1}), -731);
    t.is(toReferenceDays({year: -1, month: 12, day: 31}), -367);
    t.is(toReferenceDays({year: 0}), -366);
    t.is(toReferenceDays({year: 0, month: 1}), -366);
    t.is(toReferenceDays({year: 0, month: 1, day: 1}), -366);
    t.is(toReferenceDays({year: 0, month: 1, day: 31}), -336);
    t.is(toReferenceDays({year: 0, month: 2}), -335);
    t.is(toReferenceDays({year: 0, month: 2, day: 29}), -307);
    t.is(toReferenceDays({year: 0, month: 3}), -306);
    t.is(toReferenceDays({year: 0, month: 3, day: 1}), -306);
    t.is(toReferenceDays({year: 0, month: 3, day: 2}), -305);
    t.is(toReferenceDays({year: 0, month: 6, day: 1}), -214);
    t.is(toReferenceDays({year: 0, month: 6, day: 30}), -185);
    t.is(toReferenceDays({year: 0, month: 7, day: 1}), -184);
    t.is(toReferenceDays({year: 0, month: 7, day: 31}), -154);
    t.is(toReferenceDays({year: 0, month: 8, day: 1}), -153);
    t.is(toReferenceDays({year: 0, month: 8, day: 31}), -123);
    t.is(toReferenceDays({year: 0, month: 9, day: 1}), -122);
    t.is(toReferenceDays({year: 0, month: 9, day: 30}), -93);
    t.is(toReferenceDays({year: 0, month: 10, day: 1}), -92);
    t.is(toReferenceDays({year: 0, month: 10, day: 31}), -62);
    t.is(toReferenceDays({year: 0, month: 11, day: 1}), -61);
    t.is(toReferenceDays({year: 0, month: 11, day: 30}), -32);
    t.is(toReferenceDays({year: 1, month: 0}), -31);
    t.is(toReferenceDays({year: 0, month: 12, day: 1}), -31);
    t.is(toReferenceDays({year: 0, month: 12, day: 30}), -2);
    t.is(toReferenceDays({year: 0, month: 12, day: 31}), -1);
    t.is(toReferenceDays({}), 0);
    t.is(toReferenceDays({month: 1}), 0);
    t.is(toReferenceDays({day: 1}), 0);
    t.is(toReferenceDays({year: 1, month: 1, day: 1}), 0);
    t.is(toReferenceDays({day: 2}), 1);
    t.is(toReferenceDays({year: 1, month: 1, day: 2}), 1);
    t.is(toReferenceDays({month: 1, day: 3}), 2);
    t.is(toReferenceDays({year: 1, day: 4}), 3);
    t.is(toReferenceDays({year: 1, month: 1, day: 31}), 30);
    t.is(toReferenceDays({month: 2}), 31);
    t.is(toReferenceDays({day: 32}), 31);
    t.is(toReferenceDays({year: 1, month: 2, day: 1}), 31);
    t.is(toReferenceDays({year: 1, month: 2, day: 28}), 58);
    t.is(toReferenceDays({month: 3, day: -1}), 57);
    t.is(toReferenceDays({month: 2, day: 29}), 59);
    t.is(toReferenceDays({month: 3}), 59);
    t.is(toReferenceDays({year: 1, month: 3, day: 1}), 59);
    t.is(toReferenceDays({year: 1, month: 3, day: 31}), 89);
    t.is(toReferenceDays({month: 4}), 90);
    t.is(toReferenceDays({year: 1, month: 4, day: 1}), 90);
    t.is(toReferenceDays({year: 1, month: 4, day: 30}), 119);
    t.is(toReferenceDays({month: 5}), 120);
    t.is(toReferenceDays({year: 1, month: 5, day: 1}), 120);
    t.is(toReferenceDays({year: 1, month: 5, day: 31}), 150);
    t.is(toReferenceDays({month: 6}), 151);
    t.is(toReferenceDays({year: 1, month: 6, day: 1}), 151);
    t.is(toReferenceDays({year: 1, month: 6, day: 30}), 180);
    t.is(toReferenceDays({month: 7}), 181);
    t.is(toReferenceDays({year: 1, month: 7, day: 1}), 181);
    t.is(toReferenceDays({year: 1, month: 7, day: 31}), 211);
    t.is(toReferenceDays({month: 8}), 212);
    t.is(toReferenceDays({year: 1, month: 8, day: 1}), 212);
    t.is(toReferenceDays({year: 1, month: 8, day: 31}), 242);
    t.is(toReferenceDays({month: 9}), 243);
    t.is(toReferenceDays({year: 1, month: 9, day: 1}), 243);
    t.is(toReferenceDays({year: 1, month: 9, day: 30}), 272);
    t.is(toReferenceDays({month: 10}), 273);
    t.is(toReferenceDays({year: 1, month: 10, day: 1}), 273);
    t.is(toReferenceDays({year: 1, month: 10, day: 31}), 303);
    t.is(toReferenceDays({month: 11}), 304);
    t.is(toReferenceDays({year: 1, month: 11, day: 1}), 304);
    t.is(toReferenceDays({year: 1, month: 11, day: 30}), 333);
    t.is(toReferenceDays({month: 12}), 334);
    t.is(toReferenceDays({year: 1, month: 12, day: 1}), 334);
    t.is(toReferenceDays({year: 1, month: 12, day: 31}), 364);
    t.is(toReferenceDays({month: 13}), 365);
    t.is(toReferenceDays({year: 2}), 365);
    t.is(toReferenceDays({year: 2, month: 1, day: 1}), 365);
    t.is(toReferenceDays({year: 2, month: 1, day: 31}), 395);
    t.is(toReferenceDays({month: 14}), 396);
    t.is(toReferenceDays({year: 2, month: 2}), 396);
    t.is(toReferenceDays({year: 2, month: 2, day: 1}), 396);
    t.is(toReferenceDays({year: 2, month: 2, day: 28}), 423);
    t.is(toReferenceDays({month: 15}), 424);
    t.is(toReferenceDays({year: 2, month: 3, day: 1}), 424);
    t.is(toReferenceDays({month: 16}), 455);
    t.is(toReferenceDays({month: 17}), 485);
    t.is(toReferenceDays({month: 18}), 516);
    t.is(toReferenceDays({month: 19}), 546);
    t.is(toReferenceDays({month: 20}), 577);
    t.is(toReferenceDays({month: 21}), 608);
    t.is(toReferenceDays({month: 22}), 638);
    t.is(toReferenceDays({month: 23}), 669);
    t.is(toReferenceDays({month: 24}), 699);
    t.is(toReferenceDays({year: 2, month: 12, day: 31}), 729);
    t.is(toReferenceDays({month: 25}), 730);
    t.is(toReferenceDays({year: 2, month: 13}), 730);
    t.is(toReferenceDays({year: 3, month: 1, day: 1}), 730);
    t.is(toReferenceDays({month: 26}), 761);
    t.is(toReferenceDays({year: 4, month: -10}), 761);
    t.is(toReferenceDays({month: 27}), 789);
    t.is(toReferenceDays({month: 28}), 820);
    t.is(toReferenceDays({month: 29}), 850);
    t.is(toReferenceDays({month: 30}), 881);
    t.is(toReferenceDays({month: 31}), 911);
    t.is(toReferenceDays({month: 32}), 942);
    t.is(toReferenceDays({month: 33}), 973);
    t.is(toReferenceDays({month: 34}), 1003);
    t.is(toReferenceDays({month: 35}), 1034);
    t.is(toReferenceDays({month: 36}), 1064);
    t.is(toReferenceDays({year: 3, month: 12, day: 31}), 1094);
    t.is(toReferenceDays({month: 37}), 1095);
    t.is(toReferenceDays({year: 4, month: 1, day: 1}), 1095);
    t.is(toReferenceDays({year: 4, month: 1, day: 31}), 1125);
    t.is(toReferenceDays({month: 38}), 1126);
    t.is(toReferenceDays({year: 4, month: 2}), 1126);
    t.is(toReferenceDays({year: 4, month: 2, day: 1}), 1126);
    t.is(toReferenceDays({year: 4, month: 2, day: 28}), 1153);
    t.is(toReferenceDays({year: 4, month: 2, day: 29}), 1154);
    t.is(toReferenceDays({year: 4, month: 3, day: 1}), 1155);
    t.is(toReferenceDays({month: 39}), 1155);
    t.is(toReferenceDays({year: 4, month: 3, day: 31}), 1185);
    t.is(toReferenceDays({month: 40}), 1186);
    t.is(toReferenceDays({year: 4, month: 4, day: 1}), 1186);
    t.is(toReferenceDays({year: 4, month: 4, day: 30}), 1215);
    t.is(toReferenceDays({month: 41}), 1216);
    t.is(toReferenceDays({year: 4, month: 5, day: 1}), 1216);
    t.is(toReferenceDays({year: 4, month: 5, day: 31}), 1246);
    t.is(toReferenceDays({month: 42}), 1247);
    t.is(toReferenceDays({year: 4, month: 6, day: 1}), 1247);
    t.is(toReferenceDays({year: 4, month: 6, day: 30}), 1276);
    t.is(toReferenceDays({month: 43}), 1277);
    t.is(toReferenceDays({year: 4, month: 7, day: 1}), 1277);
    t.is(toReferenceDays({year: 4, month: 7, day: 31}), 1307);
    t.is(toReferenceDays({month: 44}), 1308);
    t.is(toReferenceDays({year: 4, month: 8, day: 1}), 1308);
    t.is(toReferenceDays({year: 4, month: 8, day: 31}), 1338);
    t.is(toReferenceDays({month: 45}), 1339);
    t.is(toReferenceDays({year: 4, month: 9, day: 1}), 1339);
    t.is(toReferenceDays({year: 4, month: 9, day: 30}), 1368);
    t.is(toReferenceDays({month: 46}), 1369);
    t.is(toReferenceDays({year: 4, month: 10, day: 1}), 1369);
    t.is(toReferenceDays({year: 4, month: 10, day: 31}), 1399);
    t.is(toReferenceDays({month: 47}), 1400);
    t.is(toReferenceDays({year: 4, month: 11, day: 1}), 1400);
    t.is(toReferenceDays({year: 4, month: 11, day: 30}), 1429);
    t.is(toReferenceDays({month: 48}), 1430);
    t.is(toReferenceDays({year: 4, month: 12, day: 1}), 1430);
    t.is(toReferenceDays({year: 4, month: 12, day: 31}), 1460);
    t.is(toReferenceDays({month: 49}), 1461);
    t.is(toReferenceDays({year: 5, month: 1, day: 1}), 1461);
    t.is(toReferenceDays({month: 50}), 1492);
    t.is(toReferenceDays({year: 5, month: 12, day: 31}), 1825);
    t.is(toReferenceDays({year: 6, month: 1, day: 1}), 1826);
    t.is(toReferenceDays({year: 6, month: 12, day: 31}), 2190);
    t.is(toReferenceDays({year: 7, month: 12, day: 31}), 2555);
    t.is(toReferenceDays({year: 8, month: 1, day: 1}), 2556);
    t.is(toReferenceDays({year: 8, month: 2, day: 29}), 2615);
    t.is(toReferenceDays({year: 8, month: 3, day: 1}), 2616);
    t.is(toReferenceDays({year: 8, month: 12, day: 31}), 2921);
    t.is(toReferenceDays({year: 9, month: 1, day: 1}), 2922);
    t.is(toReferenceDays({month: 1188}), 36128);
    t.is(toReferenceDays({year: 99, month: 12, day: 31}), 36158);
    t.is(toReferenceDays({month: 1189}), 36159);
    t.is(toReferenceDays({year: 100, month: 1, day: 1}), 36159);
    t.is(toReferenceDays({month: 1190}), 36190);
    t.is(toReferenceDays({year: 100, month: 2, day: 28}), 36217);
    t.is(toReferenceDays({month: 1191}), 36218);
    t.is(toReferenceDays({year: 100, month: 3, day: 1}), 36218);
    t.is(toReferenceDays({month: 1192}), 36249);
    t.is(toReferenceDays({month: 1200}), 36493);
    t.is(toReferenceDays({year: 100, month: 12, day: 31}), 36523);
    t.is(toReferenceDays({month: 1201}), 36524);
    t.is(toReferenceDays({year: 101, month: 1, day: 1}), 36524);
    t.is(toReferenceDays({month: 1202}), 36555);
    t.is(toReferenceDays({month: 1203}), 36583);
    t.is(toReferenceDays({month: 1204}), 36614);
    t.is(toReferenceDays({year: 101, month: 12, day: 31}), 36888);
    t.is(toReferenceDays({month: 1213}), 36889);
    t.is(toReferenceDays({year: 102, month: 12, day: 31}), 37253);
    t.is(toReferenceDays({year: 103, month: 1, day: 1}), 37254);
    t.is(toReferenceDays({year: 103, month: 1, day: 31}), 37284);
    t.is(toReferenceDays({year: 103, month: 2, day: 1}), 37285);
    t.is(toReferenceDays({year: 103, month: 2, day: 28}), 37312);
    t.is(toReferenceDays({year: 103, month: 3, day: 1}), 37313);
    t.is(toReferenceDays({year: 103, month: 12, day: 31}), 37618);
    t.is(toReferenceDays({year: 104, month: 1, day: 1}), 37619);
    t.is(toReferenceDays({year: 104, month: 2, day: 29}), 37678);
    t.is(toReferenceDays({year: 104, month: 3, day: 1}), 37679);
    t.is(toReferenceDays({year: 104, month: 12, day: 31}), 37984);
    t.is(toReferenceDays({year: 199, month: 12, day: 31}), 72682);
    t.is(toReferenceDays({year: 200, month: 1, day: 1}), 72683);
    t.is(toReferenceDays({year: 299, month: 12, day: 31}), 109206);
    t.is(toReferenceDays({year: 300, month: 1, day: 1}), 109207);
    t.is(toReferenceDays({month: 4788}), 145700);
    t.is(toReferenceDays({year: 399, month: 12, day: 31}), 145730);
    t.is(toReferenceDays({month: 4789}), 145731);
    t.is(toReferenceDays({year: 400, month: 1, day: 1}), 145731);
    t.is(toReferenceDays({month: 4790}), 145762);
    t.is(toReferenceDays({year: 400, month: 2, day: 29}), 145790);
    t.is(toReferenceDays({month: 4791}), 145791);
    t.is(toReferenceDays({year: 400, month: 3, day: 1}), 145791);
    t.is(toReferenceDays({month: 4792}), 145822);
    t.is(toReferenceDays({month: 4800}), 146066);
    t.is(toReferenceDays({year: 400, month: 12, day: 31}), 146096);
    t.is(toReferenceDays({month: 4801}), 146097);
    t.is(toReferenceDays({year: 401, month: 1, day: 1}), 146097);
    t.is(toReferenceDays({month: 4802}), 146128);
    t.is(toReferenceDays({month: 4803}), 146156);
    t.is(toReferenceDays({year: 499, month: 12, day: 31}), 182255);
    t.is(toReferenceDays({year: 1985, month: 7, day: 10}), 724831);
});

test("fromReferenceDays", t => {
    t.deepEqual(fromReferenceDays(-146463), {year: -400, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(-146405), {year: -400, month: 2, day: 28});
    t.deepEqual(fromReferenceDays(-146404), {year: -400, month: 2, day: 29});
    t.deepEqual(fromReferenceDays(-146403), {year: -400, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(-146098), {year: -400, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(-146097), {year: -399, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(-36890), {year: -100, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(-36860), {year: -100, month: 1, day: 31});
    t.deepEqual(fromReferenceDays(-36859), {year: -100, month: 2, day: 1});
    t.deepEqual(fromReferenceDays(-36832), {year: -100, month: 2, day: 28});
    t.deepEqual(fromReferenceDays(-36831), {year: -100, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(-36525), {year: -99, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(-1827), {year: -4, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(-1769), {year: -4, month: 2, day: 28});
    t.deepEqual(fromReferenceDays(-1768), {year: -4, month: 2, day: 29});
    t.deepEqual(fromReferenceDays(-1767), {year: -4, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(-1461), {year: -3, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(-1096), {year: -2, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(-731), {year: -1, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(-367), {year: -1, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(-366), {year: 0, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(-336), {year: 0, month: 1, day: 31});
    t.deepEqual(fromReferenceDays(-307), {year: 0, month: 2, day: 29});
    t.deepEqual(fromReferenceDays(-306), {year: 0, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(-214), {year: 0, month: 6, day: 1});
    t.deepEqual(fromReferenceDays(-185), {year: 0, month: 6, day: 30});
    t.deepEqual(fromReferenceDays(-184), {year: 0, month: 7, day: 1});
    t.deepEqual(fromReferenceDays(-154), {year: 0, month: 7, day: 31});
    t.deepEqual(fromReferenceDays(-153), {year: 0, month: 8, day: 1});
    t.deepEqual(fromReferenceDays(-123), {year: 0, month: 8, day: 31});
    t.deepEqual(fromReferenceDays(-122), {year: 0, month: 9, day: 1});
    t.deepEqual(fromReferenceDays(-93), {year: 0, month: 9, day: 30});
    t.deepEqual(fromReferenceDays(-92), {year: 0, month: 10, day: 1});
    t.deepEqual(fromReferenceDays(-62), {year: 0, month: 10, day: 31});
    t.deepEqual(fromReferenceDays(-61), {year: 0, month: 11, day: 1});
    t.deepEqual(fromReferenceDays(-32), {year: 0, month: 11, day: 30});
    t.deepEqual(fromReferenceDays(-31), {year: 0, month: 12, day: 1});
    t.deepEqual(fromReferenceDays(-2), {year: 0, month: 12, day: 30});
    t.deepEqual(fromReferenceDays(-1), {year: 0, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(0), {year: 1, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(1), {year: 1, month: 1, day: 2});
    t.deepEqual(fromReferenceDays(30), {year: 1, month: 1, day: 31});
    t.deepEqual(fromReferenceDays(31), {year: 1, month: 2, day: 1});
    t.deepEqual(fromReferenceDays(58), {year: 1, month: 2, day: 28});
    t.deepEqual(fromReferenceDays(59), {year: 1, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(89), {year: 1, month: 3, day: 31});
    t.deepEqual(fromReferenceDays(90), {year: 1, month: 4, day: 1});
    t.deepEqual(fromReferenceDays(119), {year: 1, month: 4, day: 30});
    t.deepEqual(fromReferenceDays(120), {year: 1, month: 5, day: 1});
    t.deepEqual(fromReferenceDays(150), {year: 1, month: 5, day: 31});
    t.deepEqual(fromReferenceDays(151), {year: 1, month: 6, day: 1});
    t.deepEqual(fromReferenceDays(180), {year: 1, month: 6, day: 30});
    t.deepEqual(fromReferenceDays(181), {year: 1, month: 7, day: 1});
    t.deepEqual(fromReferenceDays(211), {year: 1, month: 7, day: 31});
    t.deepEqual(fromReferenceDays(212), {year: 1, month: 8, day: 1});
    t.deepEqual(fromReferenceDays(242), {year: 1, month: 8, day: 31});
    t.deepEqual(fromReferenceDays(243), {year: 1, month: 9, day: 1});
    t.deepEqual(fromReferenceDays(272), {year: 1, month: 9, day: 30});
    t.deepEqual(fromReferenceDays(273), {year: 1, month: 10, day: 1});
    t.deepEqual(fromReferenceDays(303), {year: 1, month: 10, day: 31});
    t.deepEqual(fromReferenceDays(304), {year: 1, month: 11, day: 1});
    t.deepEqual(fromReferenceDays(333), {year: 1, month: 11, day: 30});
    t.deepEqual(fromReferenceDays(334), {year: 1, month: 12, day: 1});
    t.deepEqual(fromReferenceDays(364), {year: 1, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(365), {year: 2, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(395), {year: 2, month: 1, day: 31});
    t.deepEqual(fromReferenceDays(396), {year: 2, month: 2, day: 1});
    t.deepEqual(fromReferenceDays(423), {year: 2, month: 2, day: 28});
    t.deepEqual(fromReferenceDays(424), {year: 2, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(729), {year: 2, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(730), {year: 3, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(1094), {year: 3, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(1095), {year: 4, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(1125), {year: 4, month: 1, day: 31});
    t.deepEqual(fromReferenceDays(1126), {year: 4, month: 2, day: 1});
    t.deepEqual(fromReferenceDays(1153), {year: 4, month: 2, day: 28});
    t.deepEqual(fromReferenceDays(1154), {year: 4, month: 2, day: 29});
    t.deepEqual(fromReferenceDays(1155), {year: 4, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(1185), {year: 4, month: 3, day: 31});
    t.deepEqual(fromReferenceDays(1186), {year: 4, month: 4, day: 1});
    t.deepEqual(fromReferenceDays(1215), {year: 4, month: 4, day: 30});
    t.deepEqual(fromReferenceDays(1216), {year: 4, month: 5, day: 1});
    t.deepEqual(fromReferenceDays(1246), {year: 4, month: 5, day: 31});
    t.deepEqual(fromReferenceDays(1247), {year: 4, month: 6, day: 1});
    t.deepEqual(fromReferenceDays(1276), {year: 4, month: 6, day: 30});
    t.deepEqual(fromReferenceDays(1277), {year: 4, month: 7, day: 1});
    t.deepEqual(fromReferenceDays(1307), {year: 4, month: 7, day: 31});
    t.deepEqual(fromReferenceDays(1308), {year: 4, month: 8, day: 1});
    t.deepEqual(fromReferenceDays(1338), {year: 4, month: 8, day: 31});
    t.deepEqual(fromReferenceDays(1339), {year: 4, month: 9, day: 1});
    t.deepEqual(fromReferenceDays(1368), {year: 4, month: 9, day: 30});
    t.deepEqual(fromReferenceDays(1369), {year: 4, month: 10, day: 1});
    t.deepEqual(fromReferenceDays(1399), {year: 4, month: 10, day: 31});
    t.deepEqual(fromReferenceDays(1400), {year: 4, month: 11, day: 1});
    t.deepEqual(fromReferenceDays(1429), {year: 4, month: 11, day: 30});
    t.deepEqual(fromReferenceDays(1430), {year: 4, month: 12, day: 1});
    t.deepEqual(fromReferenceDays(1460), {year: 4, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(1461), {year: 5, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(1825), {year: 5, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(1826), {year: 6, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(2190), {year: 6, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(2555), {year: 7, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(2556), {year: 8, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(2615), {year: 8, month: 2, day: 29});
    t.deepEqual(fromReferenceDays(2616), {year: 8, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(2921), {year: 8, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(2922), {year: 9, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(36158), {year: 99, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(36159), {year: 100, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(36217), {year: 100, month: 2, day: 28});
    t.deepEqual(fromReferenceDays(36218), {year: 100, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(36523), {year: 100, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(36524), {year: 101, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(36888), {year: 101, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(37253), {year: 102, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(37254), {year: 103, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(37284), {year: 103, month: 1, day: 31});
    t.deepEqual(fromReferenceDays(37285), {year: 103, month: 2, day: 1});
    t.deepEqual(fromReferenceDays(37312), {year: 103, month: 2, day: 28});
    t.deepEqual(fromReferenceDays(37313), {year: 103, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(37618), {year: 103, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(37619), {year: 104, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(37678), {year: 104, month: 2, day: 29});
    t.deepEqual(fromReferenceDays(37679), {year: 104, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(37984), {year: 104, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(72682), {year: 199, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(72683), {year: 200, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(109206), {year: 299, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(109207), {year: 300, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(145730), {year: 399, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(145731), {year: 400, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(145790), {year: 400, month: 2, day: 29});
    t.deepEqual(fromReferenceDays(145791), {year: 400, month: 3, day: 1});
    t.deepEqual(fromReferenceDays(146096), {year: 400, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(146097), {year: 401, month: 1, day: 1});
    t.deepEqual(fromReferenceDays(182255), {year: 499, month: 12, day: 31});
    t.deepEqual(fromReferenceDays(724831), {year: 1985, month: 7, day: 10});
});
