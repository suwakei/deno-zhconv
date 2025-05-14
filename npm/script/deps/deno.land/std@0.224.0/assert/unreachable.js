"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unreachable = void 0;
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const assertion_error_js_1 = require("./assertion_error.js");
/**
 * Use this to assert unreachable code.
 *
 * @example
 * ```ts
 * import { unreachable } from "https://deno.land/std@$STD_VERSION/assert/unreachable.ts";
 *
 * unreachable(); // Throws
 * ```
 */
function unreachable(reason) {
    throw new assertion_error_js_1.AssertionError(reason ?? "unreachable");
}
exports.unreachable = unreachable;
