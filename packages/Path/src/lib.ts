import { Path } from "/@/Path";

/**
 * Resolves a set of path segments into a single absolute path.
 *
 * @param paths A sequence of path segments to resolve.
 *
 * @returns The resolved path as a string, or the current directory symbol if
 *   the path is empty.
 * @throws {RangeError} If the resolution goes beyond the root directory.
 */
function path(...paths: string[]) {
	return Path.path(...paths);
}

/**
 * Creates a new {@link Path `Path`} instance scoped within the resolved path.
 *
 * @param paths A sequence of path segments to resolve and scope within.
 *
 * @returns A new {@link Path `Path`} instance representing the scoped path.
 */
function within(...paths: string[]) {
	return Path.within(...paths);
}

/**
 * Computes the relative path from one path to another.
 *
 * @param from The starting path to compute from.
 * @param to The target path to compute to.
 *
 * @returns The relative path from {@link from `from`} to {@link to `to`} as a
 *   string.
 * @throws {TypeError} If the paths do not share a common root.
 */
function relative(from: string, to: string) {
	return Path.relative(from, to);
}

export { path, relative, within };

export { Path } from "/@/Path";
export * from "/@/Slicing";
