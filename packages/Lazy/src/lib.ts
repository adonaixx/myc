import type { AsyncLazy } from "/@/AsyncLazy";
import type { Lazy } from "/@/Lazy";

export { AsyncLazy } from "/@/AsyncLazy";
export { Lazy } from "/@/Lazy";
export { LazyState } from "/@/LazyState";

declare module "@myc/types" {
	/**
	 * Represents a lazy-loaded value of any type.
	 */
	export type AnyLazy = Lazy<any>;

	/**
	 * Represents an asynchronous lazy-loaded value of any type.
	 */
	export type AnyAsyncLazy = AsyncLazy<any>;
}
