/**
 * Internal utilities
 */

import isFinite = require("is-finite");

/**
 * Tests if the specified value is a non-negative finite number.
 * @internal
 */
export function isNonNegativeFinite(value: number): boolean {
    return isFinite(value) && value >= 0;
}