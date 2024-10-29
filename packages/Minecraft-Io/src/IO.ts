import { world } from "@minecraft/server";
import { Bound } from "@myc/decorators";
import { Color } from "./Color/mod";
import type { Message } from "./Common";
import type { IOTarget } from "./Types/IOTarget";

class IO {
	constructor(
		private target: IOTarget,
		public label?: string
	) {}

	private write(...messages: Message[]) {
		this.target.sendMessage(messages.flat());
	}

	/**
	 * @bound
	 */
	@Bound
	print(...messages: Message[]) {
		if (this.label) this.write(`<${this.label}> `, ...messages);
		else this.write(...messages);
	}

	/**
	 * @bound
	 */
	@Bound
	info(...messages: Message[]) {
		if (this.label) this.write(`${Color.Blue}<${this.label}> `, ...messages);
		else this.write(Color.Blue, ...messages);
	}

	/**
	 * @bound
	 */
	@Bound
	warn(...messages: Message[]) {
		if (this.label) this.write(`${Color.Ochre}<${this.label}> `, ...messages);
		else this.write(Color.Ochre, ...messages);
	}

	/**
	 * @bound
	 */
	@Bound
	error(...messages: Message[]) {
		if (this.label) this.write(`${Color.Red}<${this.label}> `, ...messages);
		else this.write(Color.Red, ...messages);
	}

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

	/**
	 * @bound
	 */
	@Bound
	async question(question: Message, cleanup: boolean = false) {
		this.print(question);
		return this.chat(cleanup);
	}
}

export { IO };
