"use strict";
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotEquals = void 0;
const _constants_js_1 = require("./_constants.js");
const equal_js_1 = require("./equal.js");
const assertion_error_js_1 = require("./assertion_error.js");
/**
 * Make an assertion that `actual` and `expected` are not equal, deeply.
 * If not then throw.
 *
 * Type parameter can be specified to ensure values under comparison have the same type.
 *
 * @example
 * ```ts
 * import { assertNotEquals } from "https://deno.land/std@$STD_VERSION/assert/assert_not_equals.ts";
 *
 * assertNotEquals(1, 2); // Doesn't throw
 * assertNotEquals(1, 1); // Throws
 * ```
 */
function assertNotEquals(actual, expected, msg) {
    if (!(0, equal_js_1.equal)(actual, expected)) {
        return;
    }
    let actualString;
    let expectedString;
    try {
        actualString = String(actual);
    }
    catch {
        actualString = _constants_js_1.CAN_NOT_DISPLAY;
    }
    try {
        expectedString = String(expected);
    }
    catch {
        expectedString = _constants_js_1.CAN_NOT_DISPLAY;
    }
    const msgSuffix = msg ? `: ${msg}` : ".";
    throw new assertion_error_js_1.AssertionError(`Expected actual: ${actualString} not to be: ${expectedString}${msgSuffix}`);
}
exports.assertNotEquals = assertNotEquals;
