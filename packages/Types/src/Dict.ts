import type { key } from "/@/Const";

/**
 * Represents a dictionary with keys of type {@link Key `Key`} and values of type
 * {@link Value `Value`}.
 */
type Dict<Key extends key, Value = unknown> = {
	[Property in Key]: Value;
};

/**
 * Represents a read-only dictionary with keys of type {@link Key `Key`} and
 * values of type {@link Value `Value`}.
 */
type ReadonlyDict<Key extends key, Value = unknown> = {
	readonly [Property in Key]: Value;
};

export type { Dict, ReadonlyDict };
