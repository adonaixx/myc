import type { ClassMethodDecorator } from "@myc/types";

const Bound: ClassMethodDecorator = (target, { addInitializer, name }) => {
	addInitializer(function () {
		// @ts-ignore
		this[name] = target.bind(this);
	});
};

export { Bound };
