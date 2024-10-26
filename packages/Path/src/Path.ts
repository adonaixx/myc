import { Bound } from "@myc/decorators";
import { CURRENT, PARENT, SLASH } from "/@/Consts";
import { resolve } from "/@/Core";

/**
 * Class representing a path and providing utilities for path resolution,
 * within-context paths, and relative path computations.
 */
class Path {
	/**
	 * The current path represented by this instance.
	 */
	public current: string;

	private constructor(current: string) {
		this.current = current;
	}

	/**
	 * Resolves a set of path segments into a single absolute path.
	 *
	 * @param paths - A sequence of path segments to resolve.
	 *
	 * @returns The resolved path as a string, or the current directory symbol
	 *   if the path is empty.
	 * @throws {RangeError} If the resolution goes beyond the root directory.
	 * @bound
	 */
	@Bound
	static path(...paths: string[]) {
		const resolved = resolve(paths);

		return resolved.length !== 0 ? resolved.join(SLASH) : CURRENT;
	}

	/**
	 * Creates a new `Path` instance scoped within the resolved path.
	 *
	 * @param paths - A sequence of path segments to resolve and scope within.
	 *
	 * @returns A new `Path` instance representing the scoped path.
	 * @bound
	 */
	@Bound
	static within(...paths: string[]) {
		return new Path(this.path(...paths));
	}

	/**
	 * Computes the relative path from one path to another.
	 *
	 * @param from - The starting path to compute from.
	 * @param to - The target path to compute to.
	 *
	 * @returns The relative path from `from` to `to` as a string.
	 * @throws {TypeError} If the paths do not share a common root.
	 * @bound
	 */
	@Bound
	static relative(from: string, to: string) {
		const fromParts = resolve(from);
		const toParts = resolve(to);

		let commonI = 0;

		while (
			commonI < fromParts.length &&
			commonI < toParts.length &&
			fromParts[commonI] === toParts[commonI]
		) {
			commonI++;
		}

		if (commonI === 0 && fromParts.length !== 0) {
			throw new TypeError(
				"Cannot compute relative path: Paths do not share a common root"
			);
		}

		const uppers = fromParts.length - commonI;
		const inners = toParts.slice(commonI);

		const relative = [...new Array<string>(uppers).fill(PARENT), ...inners];

		return relative.length !== 0
			? `${CURRENT}${SLASH}${relative.join(SLASH)}`
			: CURRENT;
	}

	/**
	 * Resolves additional path segments relative to the current instance's
	 * path.
	 *
	 * @param paths - Additional path segments to resolve relative to the
	 *   current path.
	 *
	 * @returns The fully resolved path as a string.
	 * @throws {RangeError} If the resolution goes beyond the root directory.
	 * @bound
	 */
	@Bound
	path(...paths: string[]) {
		return Path.path(this.current, ...paths);
	}

	/**
	 * Creates a new `Path` instance scoped within the current path and
	 * additional path segments.
	 *
	 * @param paths - Additional path segments to scope within the current path.
	 *
	 * @returns A new `Path` instance representing the scoped path.
	 * @bound
	 */
	@Bound
	within(...paths: string[]) {
		return Path.within(this.current, ...paths);
	}

	/**
	 * Computes the relative path from the current path to another absolute
	 * path.
	 *
	 * @param toAbsolute - The absolute path to compute relative to the current
	 *   path.
	 *
	 * @returns The relative path as a string.
	 * @throws {TypeError} If the path do not share a common root with current.
	 * @bound
	 */
	relative(toAbsolute: string): string;

	/**
	 * Computes the relative path between two paths within the current path.
	 *
	 * @param fromWithin - The starting path relative to the current path.
	 * @param toWithin - The target path relative to the current path.
	 *
	 * @returns The relative path as a string.
	 * @bound
	 */
	relative(fromWithin: string, toWithin: string): string;

	@Bound
	relative(fromOrTo: string, maybeTo?: string) {
		if (maybeTo === undefined) {
			return Path.relative(this.current, fromOrTo);
		} else {
			return Path.relative(this.path(fromOrTo), this.path(maybeTo));
		}
	}
}

export { Path };
