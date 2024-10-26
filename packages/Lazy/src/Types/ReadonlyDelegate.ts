/**
 * Interface representing a readonly delegate that provides access to a value of
 * type `T`.
 */
interface ReadonlyDelegate<T> {
	/**
	 * Retrieves the value held by the delegate.
	 *
	 * @returns The value of type `T`.
	 */
	get(): T;
}

export type { ReadonlyDelegate };
