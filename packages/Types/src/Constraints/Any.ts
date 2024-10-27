import type { key } from "/@/Const";
import type { Dict, ReadonlyDict } from "/@/Dict";

/**
 * Represents a dictionary with keys of type {@link Key `Key`} and values of any
 * type.
 */
type AnyDict<Key extends key = key> = Dict<Key, any>;
/**
 * Represents a read-only dictionary with keys of type {@link Key `Key`} and
 * values of any type.
 */
type AnyReadonlyDict<Key extends key = key> = ReadonlyDict<Key, any>;

/**
 * Represents a function that accepts any number of arguments and returns any
 * value.
 */
type AnyFunction = (...args: any[]) => any;

/**
 * Represents a constructor function that creates objects of type
 * {@link Type `Type`}.
 */
type AnyConstructor<Type extends object = object> = new (...args: any[]) => Type;
/**
 * Similar to {@link AnyConstructor `AnyConstructor`}, but indicates that the
 * constructor is abstract and cannot be directly instantiated.
 */
type AnyAbstractConstructor<Type extends object = object> = abstract new (
	...args: any[]
) => Type;

/**
 * Represents a Promise that resolves to any value.
 */
type AnyPromise = Promise<any>;

export type {
	AnyAbstractConstructor,
	AnyConstructor,
	AnyDict,
	AnyFunction,
	AnyPromise,
	AnyReadonlyDict,
};
