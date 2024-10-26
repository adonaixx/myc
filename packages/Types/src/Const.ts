/**
 * Represents a value that can be used as a key in objects.
 */
type key = string | number | symbol;

/**
 * Represents a value that represents a missing or undefined value.
 */
type missing = undefined | null | void;

/**
 * Represents a type that includes all primitive values in JavaScript.
 */
type primitive = string | number | bigint | boolean | symbol | null | undefined;

export type { key, missing, primitive };
