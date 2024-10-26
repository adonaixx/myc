import type { MaybeArray } from "@myc/types";
import { SLASH, CURRENT, PARENT } from "./Consts";

function resolve(path: string): string[];
function resolve(paths: string[]): string[];
function resolve(pathOrPaths: MaybeArray<string>): string[] {
	if (Array.isArray(pathOrPaths)) {
		const parts = pathOrPaths.flatMap((part) => {
			return part.split(SLASH).filter((part) => part.length !== 0);
		});
		const finalParts: string[] = [];

		for (const part of parts) {
			switch (part) {
				case CURRENT:
					break;
				case PARENT:
					if (finalParts.length === 0) {
						throw new RangeError(
							"Cannot resolve path: Attempted to go beyond the root directory"
						);
					} else {
						finalParts.pop();
					}
					break;
				default:
					finalParts.push(part);
					break;
			}
		}

		return finalParts;
	} else {
		return resolve([pathOrPaths]);
	}
}

export { resolve };
