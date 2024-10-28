import { world } from "@minecraft/server";
import { Bound } from "@myc/decorators";
import type { IOTarget } from "/@/Types/IOTarget";

class IO {
	constructor(private target: IOTarget) {}

	/**
	 * @bound
	 */
	@Bound
	async chat(cleanup: boolean = false) {
		return new Promise<string>((resolve) => {
			world.beforeEvents.chatSend.subscribe((event) => {
				if (this.target !== world && event.sender === this.target) {
					resolve(event.message);
					if (cleanup) {
						event.cancel = true;
					}
				}
			});
		});
	}
}

export { IO };
