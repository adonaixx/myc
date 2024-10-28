import type { ClassMethodDecorator } from "@myc/types";

/**
 * Automatically binds a class method to its instance, ensuring that `this`
 * always references the correct instance within the method, even when called
 * outside its original context.
 */
const Bound: ClassMethodDecorator = (target, { addInitializer, name }) => {
	addInitializer(function () {
		// @ts-ignore
		this[name] = target.bind(this);
	});
};

export { Bound };
