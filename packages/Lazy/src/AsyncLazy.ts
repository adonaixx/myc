import type { AnyAsyncLazy, Supplier } from "@myc/types";
import type { ReadonlyDelegate } from "/@/Types/ReadonlyDelegate";
import { LazyState } from "/@/LazyState";

/**
 * Class representing a lazy-loaded asynchronous value of type {@link T `T`}. The
 * value is only computed when force-loaded and awaited for the first time.
 *
 * @remarks
 * Asynchronous lazy-loaded values cannot be automatically loaded on
 * {@link get `get()`}, so you need to manually load it before use with either
 * {@link AsyncLazy.load `AsyncLazy.load()`} or
 * {@link AsyncLazy.loadAll `AsyncLazy.loadAll()`}.
 */
class AsyncLazy<T> implements ReadonlyDelegate<T> {
	private supplier: Supplier<Promise<T>>;
	private value!: T;

	/**
	 * The current state of the lazy-loaded value.
	 */
	state: LazyState = LazyState.Unloaded;

	/**
	 * Creates an instance of {@link AsyncLazy `AsyncLazy`}.
	 *
	 * @param supplier A function that provides a promise resolving to the
	 *   value.
	 */
	constructor(supplier: Supplier<Promise<T>>) {
		this.supplier = supplier;
	}

	/**
	 * Forces the asynchronous loading of the lazy value.
	 *
	 * @param asyncLazy The {@link AsyncLazy `AsyncLazy`} instance to load.
	 */
	static async load(asyncLazy: AnyAsyncLazy) {
		await asyncLazy.tryLoad();
	}

	/**
	 * Forces the asynchronous loading of multiple lazy values.
	 *
	 * @param asyncLazies A list of {@link AsyncLazy `AsyncLazy`} instances to
	 *   load.
	 */
	static async loadAll(...asyncLazies: AnyAsyncLazy[]) {
		await Promise.all(asyncLazies.map((asyncLazy) => asyncLazy.tryLoad()));
	}

	private async tryLoad() {
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
