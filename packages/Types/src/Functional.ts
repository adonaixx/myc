/**
 * A function that performs a trigger action.
 *
 * @template This - The type of the `this` context in which the function is invoked.
 */
type Trigger<This = void> = (this: This) => void;

/**
 * A function that consumes a single argument of a given `Type`.
 *
 * @template This - The type of the `this` context in which the function is invoked.
 */
type Consumer<Type, This = void> = (this: This, arg: Type) => void;

/**
 * A function that consumes multiple arguments of a given `Type`.
 *
 * @template This - The type of the `this` context in which the function is invoked.
 */
type Eater<Type, This = void> = (this: This, ...args: Type[]) => void;

/**
 * A function that supplies a value of a given `Type`.
 *
 * @template This - The type of the `this` context in which the function is invoked.
 */
type Supplier<Type, This = void> = (this: This) => Type;

/**
 * A function that transforms an argument of one type (`Type`) into a value of another
 * type (`Target`).
 *
 * @template Type - The type of the input argument to be transformed.
 * @template Target - The type of the result of the transformation.
 * @template This - The type of the `this` context in which the function is invoked.
 */
type Transform<Type, Target, This = void> = (this: This, arg: Type) => Target;

export type { Consumer, Eater, Supplier, Transform, Trigger };
