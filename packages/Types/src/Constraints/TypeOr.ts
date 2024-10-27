import type { missing } from "/@/Const";

/**
 * A utility type that represents a value that can be either of type
 * {@link T `T`} or `undefined`.
 */
type Option<T> = T | undefined;

/**
 * A utility type that represents a value that can be either of type
 * {@link T `T`} or `null`.
 */
type Nullable<T> = T | null;

/**
 * A utility type that represents a value that can be either of type
 * {@link T `T`} or `void`.
 */
type Voidable<T> = T | void;

/**
 * A utility type that represents a value that can be either of type
 * {@link T `T`} or a {@link missing `missing`} value.
 */
type Maybe<T> = T | missing;

/**
 * A utility type that represents a value that can be either of type
 * {@link T `T`} or an array of items of type {@link T `T`}.
 */
type MaybeArray<T> = T | T[];

/**
 * A utility type that represents a value that can be either of type
 * {@link T `T`} or a promise that resolves to {@link T `T`}.
 */
type MaybePromise<T> = T | Promise<T>;

export type { Maybe, MaybeArray, MaybePromise, Nullable, Option, Voidable };
