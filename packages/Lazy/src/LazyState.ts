/**
 * Enum representing the state of a lazy-loaded value.
 */
enum LazyState {
	/**
	 * The value has not been loaded yet.
	 */
	Unloaded = "unloaded",

	/**
	 * The value has been successfully loaded.
	 */
	Loaded = "loaded",
}

export { LazyState };
