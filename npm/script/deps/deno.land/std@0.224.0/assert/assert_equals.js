"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertEquals = void 0;
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const equal_js_1 = require("./equal.js");
const mod_js_1 = require("../internal/mod.js");
const assertion_error_js_1 = require("./assertion_error.js");
const colors_js_1 = require("../fmt/colors.js");
const _constants_js_1 = require("./_constants.js");
/**
 * Make an assertion that `actual` and `expected` are equal, deeply. If not
 * deeply equal, then throw.
 *
 * Type parameter can be specified to ensure values under comparison have the
 * same type.
 *
 * @example
 * ```ts
 * import { assertEquals } from "https://deno.land/std@$STD_VERSION/assert/assert_equals.ts";
 *
 * assertEquals("world", "world"); // Doesn't throw
 * assertEquals("hello", "world"); // Throws
 * ```
 *
 * Note: formatter option is experimental and may be removed in the future.
 */
function assertEquals(actual, expected, msg, options = {}) {
    if ((0, equal_js_1.equal)(actual, expected)) {
        return;
    }
    const { formatter = mod_js_1.format } = options;
    const msgSuffix = msg ? `: ${msg}` : ".";
    let message = `Values are not equal${msgSuffix}`;
    const actualString = formatter(actual);
    const expectedString = formatter(expected);
    try {
        const stringDiff = (typeof actual === "string") &&
            (typeof expected === "string");
        const diffResult = stringDiff
            ? (0, mod_js_1.diffstr)(actual, expected)
            : (0, mod_js_1.diff)(actualString.split("\n"), expectedString.split("\n"));
        const diffMsg = (0, mod_js_1.buildMessage)(diffResult, { stringDiff }).join("\n");
        message = `${message}\n${diffMsg}`;
    }
    catch {
        message = `${message}\n${(0, colors_js_1.red)(_constants_js_1.CAN_NOT_DISPLAY)} + \n\n`;
    }
    throw new assertion_error_js_1.AssertionError(message);
}
exports.assertEquals = assertEquals;
