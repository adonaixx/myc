import type { RawMessage } from "@minecraft/server";
import type { MaybeArray } from "@myc/types";

interface IOTarget {
	sendMessage(message: MaybeArray<RawMessage | string>): void;
}

export type { IOTarget };

