"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = void 0;
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const assert_js_1 = require("./assert.js");
/**
 * Forcefully throws a failed assertion.
 *
 * @example
 * ```ts
 * import { fail } from "https://deno.land/std@$STD_VERSION/assert/fail.ts";
 *
 * fail("Deliberately failed!"); // Throws
 * ```
 */
function fail(msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    (0, assert_js_1.assert)(false, `Failed assertion${msgSuffix}`);
}
exports.fail = fail;
