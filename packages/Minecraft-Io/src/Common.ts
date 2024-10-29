import type { RawMessage } from "@minecraft/server";
import type { MaybeArray } from "@myc/types";

type Message = MaybeArray<string | RawMessage>;

export type { Message };

