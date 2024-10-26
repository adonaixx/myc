import type { missing } from "@/Const";

/**
 * A utility type that represents a value that can be either of type `Type` or
 * `undefined`.
 */
type Option<Type> = Type | undefined;

/**
 * A utility type that represents a value that can be either of type `Type` or
 * `null`.
 */
type Nullable<Type> = Type | null;

/**
 * A utility type that represents a value that can be either of type `Type` or
 * `void`.
 */
type Voidable<Type> = Type | void;

/**
 * A utility type that represents a value that can be either of type `Type` or a
 * {@link missing} value.
 */
type Maybe<Type> = Type | missing;

/**
 * A utility type that represents a value that can be either of type `Type` or
 * an array of `Type`.
 */
type MaybeArray<Type> = Type | Type[];

/**
 * A utility type that represents a value that can be either of type `Type` or a
 * promise that resolves to `Type`.
 */
type MaybePromise<Type> = Type | Promise<Type>;

export type { Maybe, MaybeArray, MaybePromise, Nullable, Option, Voidable };
