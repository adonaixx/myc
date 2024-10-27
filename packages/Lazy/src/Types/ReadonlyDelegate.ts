/**
 * Interface representing a read-only delegate that provides access to a value
 * of type {@link T `T`}.
 */
interface ReadonlyDelegate<T> {
	/**
	 * Retrieves the value held by the delegate.
	 *
	 * @returns The value of type {@link T `T`}.
	 */
	get(): T;
}

export type { ReadonlyDelegate };
