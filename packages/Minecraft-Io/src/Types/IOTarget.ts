import type { Message } from "/@/Common";

interface IOTarget {
	sendMessage(message: Message): void;
}

export type { IOTarget };

