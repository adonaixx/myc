import type { Message } from "/@/Common";

const reset = "§r";

function message(template: TemplateStringsArray, ...messages: Message[]): Message {
	const lastI = template.length - 1;

	return template.flatMap((piece, i) => {
		if (i === lastI) return [piece];
		else {
			const message = messages[i]!;

			if (Array.isArray(message)) return [piece, reset, ...message, reset];
			else return [piece, reset, message, reset];
		}
	});
}

export { Color } from "./Color";
export { Format } from "./Format";
export { message, reset };
