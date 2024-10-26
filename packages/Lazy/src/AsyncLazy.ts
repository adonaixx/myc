import type { Supplier } from "@myc/types";
import type { ReadonlyDelegate } from "/@/Types/ReadonlyDelegate";
import { LazyState } from "/@/LazyState";

/**
 * Class representing a lazily loaded asynchronous value of type `T`. The value
 * is only computed when accessed and awaited for the first time.
 */
class AsyncLazy<T> implements ReadonlyDelegate<T> {
	private supplier: Supplier<Promise<T>>;
	private value!: T;

	/**
	 * The current state of the lazy-loaded value.
	 */
	state: LazyState = LazyState.Unloaded;

	/**
	 * Creates an instance of AsyncLazy.
	 *
	 * @param supplier - A function that provides a promise resolving to the
	 *   value.
	 */
	constructor(supplier: Supplier<Promise<T>>) {
		this.supplier = supplier;
	}

	/**
	 * Forces the asynchronous loading of the lazy value.
	 *
	 * @param asyncLazy - The AsyncLazy instance to load.
	 */
	static async load(asyncLazy: AsyncLazy<any>) {
		await asyncLazy.tryLoad();
	}

	/**
	 * Forces the asynchronous loading of multiple lazy values.
	 *
	 * @param asyncLazies - A list of AsyncLazy instances to load.
	 */
	static async loadAll(...asyncLazies: AsyncLazy<any>[]) {
		await Promise.all(asyncLazies.map((asyncLazy) => asyncLazy.tryLoad()));
	}

	async tryLoad() {
		if (this.state === LazyState.Unloaded) {
			this.value = await this.supplier();
			this.state = LazyState.Loaded;
		}
	}

	/**
	 * Retrieves the value, ensuring that it is loaded before use.
	 *
	 * @returns The asynchronously loaded value.
	 * @throws {Error} If the value has not been force-loaded yet.
	 */
	get(): T {
		if (this.state !== LazyState.Loaded) {
			throw new Error(
				"Cannot get value: AsyncLazy objects must be loaded before use"
			);
		} else {
			return this.value;
		}
	}
}

export { AsyncLazy };
