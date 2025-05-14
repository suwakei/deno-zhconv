// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { AssertionError } from "./assertion_error.js";
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
export function unreachable(reason) {
    throw new AssertionError(reason ?? "unreachable");
}
