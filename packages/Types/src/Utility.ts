/**
 * Creates a new type that is identical to the given `Type` but makes all properties
 * mutable.
 */
type Mutable<Type> = {
	-readonly [Key in keyof Type]: Type[Key];
};

export type { Mutable };
