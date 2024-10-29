import { CURRENT, PARENT, SLASH } from "/@/Consts";

function resolve(...paths: string[]): string[] {
	const parts = paths.flatMap((part) => {
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
}

export { resolve };
