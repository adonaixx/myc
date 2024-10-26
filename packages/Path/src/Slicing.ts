import type { Option } from "@myc/types";
import { SLASH } from "/@/Consts";

/**
 * Extracts the directory name from a given path.
 *
 * @param path - The full file path.
 *
 * @returns The directory part of the path, or `undefined` if no directory can
 *   be determined.
 */
function dirName(path: string): Option<string> {
	const dirParts = path.split(SLASH).slice(0, -1);

	if (dirParts.length !== 0) return dirParts.join(SLASH);
}

/**
 * Extracts the entity (file or folder) name from a given path.
 *
 * @param path - The full file path.
 * @param noExt - Whether or not to remove the extension from the entity name
 *   (defaults to `false`).
 *
 * @returns The entity name.
 */
function entityName(path: string, noExt: boolean = false) {
	const entity = path.split(SLASH).at(-1)!;

	if (noExt) return entity.substring(0, entity.lastIndexOf("."));
	else return entity;
}

/**
 * Extracts the extension name from a given file path.
 *
 * @param path - The full file path.
 *
 * @returns The file extension or `undefined` if no extension exists.
 */
function extName(path: string): Option<string> {
	return entityName(path).split(".").at(-1);
}

export { dirName, entityName, extName };
