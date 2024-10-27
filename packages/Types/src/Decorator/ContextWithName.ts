import type { AnyFunction } from "/@/Constraints";

/**
 * Context provided to a class method decorator with a specific name of literal
 * {@link Name `type`}.
 *
 * @template Name The name of the method being decorated.
 * @template This The type on which the class element will be defined. For a
 *   static class element, this will be the type of the constructor. For a
 *   non-static class element, this will be the type of the instance.
 * @template Value The type of the decorated class method.
 */
interface ClassMethodDecoratorContextWithName<
	Name extends string,
	This,
	Value extends AnyFunction,
> extends ClassMethodDecoratorContext<This, Value> {
	/**
	 * @inheritdoc
	 */
	name: Name;
}

/**
 * Context provided to a class field decorator with a specific name of literal
 * {@link Name `type`}.
 *
 * @template Name The name of the field being decorated.
 * @template This The type on which the class element will be defined. For a
 *   static class element, this will be the type of the constructor. For a
 *   non-static class element, this will be the type of the instance.
 * @template Value The type of the decorated class field.
 */
interface ClassFieldDecoratorContextWithName<Name extends string, This, Value>
	extends ClassFieldDecoratorContext<This, Value> {
	/**
	 * @inheritdoc
	 */
	name: Name;
}

/**
 * Context provided to a class setter decorator with a specific name of literal
 * {@link Name `type`}.
 *
 * @template Name The name of the setter being decorated.
 * @template This The type on which the class element will be defined. For a
 *   static class element, this will be the type of the constructor. For a
 *   non-static class element, this will be the type of the instance.
 * @template Value The type of the decorated class setter.
 */
interface ClassSetterDecoratorContextWithName<Name extends string, This, Value>
	extends ClassSetterDecoratorContext<This, Value> {
	/**
	 * @inheritdoc
	 */
	name: Name;
}

/**
 * Context provided to a class getter decorator with a specific name of literal
 * {@link Name `type`}.
 *
 * @template Name The name of the getter being decorated.
 * @template This The type on which the class element will be defined. For a
 *   static class element, this will be the type of the constructor. For a
 *   non-static class element, this will be the type of the instance.
 * @template Value The type of the decorated class getter.
 */
interface ClassGetterDecoratorContextWithName<Name extends string, This, Value>
	extends ClassGetterDecoratorContext<This, Value> {
	/**
	 * @inheritdoc
	 */
	name: Name;
}

/**
 * Context provided to a class `accessor` field decorator with a specific string
 * of literal type {@link Name `name`}.
 *
 * @template Name The name of the accessor being decorated.
 * @template This The type on which the class element will be defined. For a
 *   static class element, this will be the type of the constructor. For a
 *   non-static class element, this will be the type of the instance.
 * @template Value The type of the decorated class field.
 */
interface ClassAccessorDecoratorContextWithName<Name extends string, This, Value>
	extends ClassAccessorDecoratorContext<This, Value> {
	/**
	 * @inheritdoc
	 */
	name: Name;
}

export type {
	ClassMethodDecoratorContextWithName,
	ClassFieldDecoratorContextWithName,
	ClassGetterDecoratorContextWithName,
	ClassSetterDecoratorContextWithName,
	ClassAccessorDecoratorContextWithName,
};
