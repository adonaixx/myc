import type { AnyLazy, Supplier } from "@myc/types";
import type { ReadonlyDelegate } from "/@/Types/ReadonlyDelegate";
import { LazyState } from "/@/LazyState";

/**
 * Class representing a lazy-loaded value of type {@link T `T`}. The value is
 * only computed either when accessed or when force-loaded, both for the first
 * time.
 */
class Lazy<T> implements ReadonlyDelegate<T> {
	private supplier: Supplier<T>;
	private value!: T;

	/**
	 * The current state of the lazy-loaded value.
	 */
	state: LazyState = LazyState.Unloaded;

	/**
	 * Creates an instance of {@link Lazy `Lazy`}.
	 *
	 * @param supplier A function that provides the value when called.
	 */
	constructor(supplier: Supplier<T>) {
		this.supplier = supplier;
	}

	/**
	 * Forces the loading of the lazy value.
	 *
	 * @param lazy The {@link Lazy `Lazy`} instance to load.
	 */
	static load(lazy: AnyLazy) {
		lazy.tryLoad();
	}

	/**
	 * Forces the loading of multiple lazy values.
	 *
	 * @param lazies A list of {@link Lazy `Lazy`} instances to load.
	 */
	static loadAll(...lazies: AnyLazy[]) {
		lazies.forEach((lazy) => lazy.tryLoad());
	}

	private tryLoad() {
		if (this.state === LazyState.Unloaded) {
			this.value = this.supplier();
			this.state = LazyState.Loaded;
		}
	}

	/**
	 * Retrieves the value, loading it if necessary.
	 *
	 * @returns The lazy-loaded value.
	 */
	get(): T {
		this.tryLoad();
		return this.value;
	}
}

export { Lazy };
