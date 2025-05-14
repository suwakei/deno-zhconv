"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertStrictEquals = void 0;
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const mod_js_1 = require("../internal/mod.js");
const assertion_error_js_1 = require("./assertion_error.js");
const _constants_js_1 = require("./_constants.js");
const colors_js_1 = require("../fmt/colors.js");
/**
 * Make an assertion that `actual` and `expected` are strictly equal. If
 * not then throw.
 *
 * @example
 * ```ts
 * import { assertStrictEquals } from "https://deno.land/std@$STD_VERSION/assert/assert_strict_equals.ts";
 *
 * const a = {};
 * const b = a;
 * assertStrictEquals(a, b); // Doesn't throw
 *
 * const c = {};
 * const d = {};
 * assertStrictEquals(c, d); // Throws
 * ```
 */
function assertStrictEquals(actual, expected, msg) {
    if (Object.is(actual, expected)) {
        return;
    }
    const msgSuffix = msg ? `: ${msg}` : ".";
    let message;
    const actualString = (0, mod_js_1.format)(actual);
    const expectedString = (0, mod_js_1.format)(expected);
    if (actualString === expectedString) {
        const withOffset = actualString
            .split("\n")
            .map((l) => `    ${l}`)
            .join("\n");
        message =
            `Values have the same structure but are not reference-equal${msgSuffix}\n\n${(0, colors_js_1.red)(withOffset)}\n`;
    }
    else {
        try {
            const stringDiff = (typeof actual === "string") &&
                (typeof expected === "string");
            const diffResult = stringDiff
                ? (0, mod_js_1.diffstr)(actual, expected)
                : (0, mod_js_1.diff)(actualString.split("\n"), expectedString.split("\n"));
            const diffMsg = (0, mod_js_1.buildMessage)(diffResult, { stringDiff }).join("\n");
            message = `Values are not strictly equal${msgSuffix}\n${diffMsg}`;
        }
        catch {
            message = `\n${(0, colors_js_1.red)(_constants_js_1.CAN_NOT_DISPLAY)} + \n\n`;
        }
    }
    throw new assertion_error_js_1.AssertionError(message);
}
exports.assertStrictEquals = assertStrictEquals;
