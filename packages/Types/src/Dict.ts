import type { key } from "@/Const";

/**
 * Represents a dictionary with keys of type {@link Key} and values of type
 * {@link Value}.
 */
type Dict<Key extends key, Value = unknown> = {
	[Property in Key]: Value;
};

/**
 * Similar to {@link Dict}, but ensures that the object is read-only, preventing
 * modifications to its properties.
 */
type ReadonlyDict<Key extends key, Value = unknown> = {
	readonly [Property in Key]: Value;
};

export type { Dict, ReadonlyDict };
