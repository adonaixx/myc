import type {
	ClassAccessorDecoratorContextWithName,
	ClassFieldDecoratorContextWithName,
	ClassGetterDecoratorContextWithName,
	ClassMethodDecoratorContextWithName,
	ClassSetterDecoratorContextWithName,
} from "./ContextWithName";
import type {
	AnyAbstractConstructor,
	AnyFunction,
	Option,
	Voidable,
} from "/@/Constraints";

/**
 * A decorator for a class constructor.
 */
interface ClassDecorator {
	/**
	 * @param target The class constructor being decorated.
	 * @param context Metadata about the class constructor context.
	 *
	 * @returns Optionally returns a new class constructor.
	 */
	<Class extends AnyAbstractConstructor>(
		target: Class,
		context: ClassDecoratorContext<Class>
	): Voidable<Class>;
}

/**
 * A typed decorator for a class constructor with a specific base type.
 *
 * @template Type The specific base type for the class.
 */
interface TypedClassDecorator<Type extends AnyAbstractConstructor> {
	/**
	 * @param target The class constructor being decorated.
	 * @param context Metadata about the class constructor context.
	 *
	 * @returns Optionally returns a new class constructor.
	 */
	<Class extends Type>(
		target: Class,
		context: ClassDecoratorContext<Class>
	): Voidable<Class>;
}

/**
 * A decorator for a class method.
 */
interface ClassMethodDecorator {
	/**
	 * @param target The method being decorated.
	 * @param context Metadata about the method context.
	 *
	 * @returns Optionally returns a new method.
	 */
	<This, Method extends AnyFunction>(
		target: Method,
		context: ClassMethodDecoratorContext<This, Method>
	): Voidable<Method>;
}

/**
 * A typed decorator for a class method with a specific method type.
 *
 * @template Type The specific type of the method.
 * @template ThisType The type of `this` in the method.
 */
interface TypedClassMethodDecorator<Type extends AnyFunction, ThisType = object> {
	/**
	 * @param target The method being decorated.
	 * @param context Metadata about the method context.
	 *
	 * @returns Optionally returns a new method.
	 */
	<This extends ThisType, Method extends Type>(
		target: Method,
		context: ClassMethodDecoratorContext<This, Method>
	): Voidable<Method>;
}

/**
 * A typed decorator for a class method with a specific name and method type.
 *
 * @template Name The name of the method.
 * @template Type The specific type of the method.
 * @template ThisType The type of `this` in the method.
 */
interface TypedClassMethodDecoratorWithName<
	Name extends string,
	Type extends AnyFunction = AnyFunction,
	ThisType = object,
> {
	/**
	 * @param target The method being decorated.
	 * @param context Metadata about the method context.
	 *
	 * @returns Optionally returns a new method.
	 */
	<This extends ThisType, Method extends Type>(
		target: Method,
		context: ClassMethodDecoratorContextWithName<Name, This, Method>
	): Voidable<Method>;
}

/**
 * The result function for a class field decorator.
 *
 * @template This The type of `this` in the result function.
 * @template Type The type of the field value.
 */
type ClassFieldDecoratorResult<This, Type> = (this: This, value: Type) => Type;

/**
 * A decorator for a class field.
 */
interface ClassFieldDecorator {
	/**
	 * @param target The field being decorated.
	 * @param context Metadata about the field context.
	 *
	 * @returns Optionally returns a function that processes the field value.
	 */
	<This, Type>(
		target: Option<Type>,
		context: ClassFieldDecoratorContext<This, Type>
	): Voidable<ClassFieldDecoratorResult<Type, This>>;
}

/**
 * A typed decorator for a class field with a specific field type.
 *
 * @template Type The specific type of the field value.
 * @template ThisType The type of `this` in the field.
 */
interface TypedClassFieldDecorator<Type, ThisType = object> {
	/**
	 * @param target The field being decorated.
	 * @param context Metadata about the field context.
	 *
	 * @returns Optionally returns a function that processes the field value.
	 */
	<This extends ThisType, Field extends Type>(
		target: Option<Field>,
		context: ClassFieldDecoratorContext<This, Field>
	): Voidable<ClassFieldDecoratorResult<Field, This>>;
}

/**
 * A typed decorator for a class field with a specific name and field type.
 *
 * @template Name The name of the field.
 * @template Type The specific type of the field value.
 * @template ThisType The type of `this` in the field.
 */
interface TypedClassFieldDecoratorWithName<
	Name extends string,
	Type = unknown,
	ThisType = object,
> {
	/**
	 * @param target The field being decorated.
	 * @param context Metadata about the field context.
	 *
	 * @returns Optionally returns a function that processes the field value.
	 */
	<This extends ThisType, Field extends Type>(
		target: Option<Field>,
		context: ClassFieldDecoratorContextWithName<Name, This, Field>
	): Voidable<ClassFieldDecoratorResult<Field, This>>;
}

/**
 * The target function for a class getter decorator.
 *
 * @template This The type of `this` in the getter.
 * @template Type The type of the value returned by the getter.
 */
type ClassGetterDecoratorTarget<This, Type> = (this: This) => Type;

/**
 * A decorator for a class getter.
 */
interface ClassGetterDecorator {
	/**
	 * @param target The getter function being decorated.
	 * @param context Metadata about the getter context.
	 *
	 * @returns Optionally returns a new getter function.
	 */
	<This, Type>(
		target: ClassGetterDecoratorTarget<This, Type>,
		context: ClassGetterDecoratorContext<This, Type>
	): Voidable<ClassGetterDecoratorTarget<This, Type>>;
}

/**
 * A typed decorator for a class getter with a specific return type.
 *
 * @template Type The specific return type of the getter.
 * @template ThisType The type of `this` in the getter.
 */
interface TypedClassGetterDecorator<Type, ThisType = object> {
	/**
	 * @param target The getter function being decorated.
	 * @param context Metadata about the getter context.
	 *
	 * @returns Optionally returns a new getter function.
	 */
	<This extends ThisType, Getty extends Type>(
		target: ClassGetterDecoratorTarget<This, Getty>,
		context: ClassGetterDecoratorContext<This, Getty>
	): Voidable<ClassGetterDecoratorTarget<This, Getty>>;
}

/**
 * A typed decorator for a class getter with a specific name and return type.
 *
 * @template Name The name of the getter.
 * @template Type The specific return type of the getter.
 * @template ThisType The type of `this` in the getter.
 */
interface TypedClassGetterDecoratorWithName<
	Name extends string,
	Type = unknown,
	ThisType = object,
> {
	/**
	 * @param target The getter function being decorated.
	 * @param context Metadata about the getter context including the getter
	 *   name.
	 *
	 * @returns Optionally returns a new getter function.
	 */
	<This extends ThisType, Getty extends Type>(
		target: ClassGetterDecoratorTarget<This, Getty>,
		context: ClassGetterDecoratorContextWithName<Name, This, Getty>
	): Voidable<ClassGetterDecoratorTarget<This, Getty>>;
}

/**
 * The target function for a class setter decorator.
 *
 * @template This The type of `this` in the setter.
 * @template Type The type of the value accepted by the setter.
 */
type ClassSetterDecoratorTarget<This, Type> = (this: This, value: Type) => void;

/**
 * A decorator for a class setter.
 */
interface ClassSetterDecorator {
	/**
	 * @param target The setter function being decorated.
	 * @param context Metadata about the setter context.
	 *
	 * @returns Optionally returns a new setter function.
	 */
	<This, Type>(
		target: ClassSetterDecoratorTarget<This, Type>,
		context: ClassSetterDecoratorContext<This, Type>
	): Voidable<ClassSetterDecoratorTarget<This, Type>>;
}

/**
 * A typed decorator for a class setter with a specific value type.
 *
 * @template Type The specific type of the value accepted by the setter.
 * @template ThisType The type of `this` in the setter.
 */
interface TypedClassSetterDecorator<Type, ThisType = object> {
	/**
	 * @param target The setter function being decorated.
	 * @param context Metadata about the setter context.
	 *
	 * @returns Optionally returns a new setter function.
	 */
	<This extends ThisType, Setty extends Type>(
		target: ClassSetterDecoratorTarget<This, Setty>,
		context: ClassSetterDecoratorContext<This, Setty>
	): Voidable<ClassSetterDecoratorTarget<This, Setty>>;
}

/**
 * A typed decorator for a class setter with a specific name and value type.
 *
 * @template Name The name of the setter.
 * @template Type The specific type of the value accepted by the setter.
 * @template ThisType The type of `this` in the setter.
 */
interface TypedClassSetterDecoratorWithName<
	Name extends string,
	Type = unknown,
	ThisType = object,
> {
	/**
	 * @param target The setter function being decorated.
	 * @param context Metadata about the setter context.
	 *
	 * @returns Optionally returns a new setter function.
	 */
	<This extends ThisType, Setty extends Type>(
		target: ClassSetterDecoratorTarget<This, Setty>,
		context: ClassSetterDecoratorContextWithName<Name, This, Setty>
	): Voidable<ClassSetterDecoratorTarget<This, Setty>>;
}

/**
 * A decorator for a class accessor.
 */
interface ClassAccessorDecorator {
	/**
	 * @param target The accessor function being decorated.
	 * @param context Metadata about the accessor context.
	 *
	 * @returns Optionally returns a new accessor function.
	 */
	<This, Type>(
		target: ClassAccessorDecoratorTarget<This, Type>,
		context: ClassAccessorDecoratorContext<This, Type>
	): Voidable<ClassAccessorDecoratorResult<This, Type>>;
}

/**
 * A typed decorator for a class accessor with a specific value type.
 *
 * @template Type The specific type of the value handled by the accessor.
 * @template ThisType The type of `this` in the accessor.
 */
interface TypedClassAccessorDecorator<Type, ThisType = object> {
	/**
	 * @param target The accessor function being decorated.
	 * @param context Metadata about the accessor context.
	 *
	 * @returns Optionally returns a new accessor function.
	 */
	<This extends ThisType, Accessed extends Type>(
		target: ClassAccessorDecoratorTarget<This, Accessed>,
		context: ClassAccessorDecoratorContext<This, Accessed>
	): Voidable<ClassAccessorDecoratorResult<This, Accessed>>;
}

/**
 * A typed decorator for a class accessor with a specific name and value type.
 *
 * @template Name The name of the accessor.
 * @template Type The specific type of the value handled by the accessor.
 * @template ThisType The type of `this` in the accessor.
 */
interface TypedClassAccessorDecoratorWithName<
	Name extends string,
	Type = unknown,
	ThisType = object,
> {
	/**
	 * @param target The accessor function being decorated.
	 * @param context Metadata about the accessor context.
	 *
	 * @returns Optionally returns a new accessor function.
	 */
	<This extends ThisType, Accessed extends Type>(
		target: ClassAccessorDecoratorTarget<This, Accessed>,
		context: ClassAccessorDecoratorContextWithName<Name, This, Accessed>
	): Voidable<ClassAccessorDecoratorResult<This, Accessed>>;
}

export type {
	ClassAccessorDecorator,
	ClassDecorator,
	ClassFieldDecorator,
	ClassFieldDecoratorResult,
	ClassGetterDecorator,
	ClassGetterDecoratorTarget,
	ClassMethodDecorator,
	ClassSetterDecorator,
	ClassSetterDecoratorTarget,
	TypedClassAccessorDecorator,
	TypedClassAccessorDecoratorWithName,
	TypedClassDecorator,
	TypedClassFieldDecorator,
	TypedClassFieldDecoratorWithName,
	TypedClassGetterDecorator,
	TypedClassGetterDecoratorWithName,
	TypedClassMethodDecorator,
	TypedClassMethodDecoratorWithName,
	TypedClassSetterDecorator,
	TypedClassSetterDecoratorWithName,
};
