# Typestone

[![MIT License](https://img.shields.io/github/license/itskyedo/typestone?color=blue)](https://github.com/itskyedo/typestone/blob/main/LICENSE)
[![Project Status](https://img.shields.io/badge/project_status-pre--alpha-red)](https://github.com/itskyedo/typestone)
[![Last Commit](https://img.shields.io/github/last-commit/itskyedo/typestone/main?color=orange)](https://github.com/itskyedo/typestone)
[![Commit Activity](https://img.shields.io/github/commit-activity/m/itskyedo/typestone/main?color=brightgreen)](https://github.com/itskyedo/typestone)
[![GitHub Stars](https://img.shields.io/github/stars/itskyedo/typestone)](https://github.com/itskyedo/typestone)

## Introduction

Typestone is a TypeScript validation library that delivers best-in-class type safety through a simple, composable, and reusable API.

It enables developers to define schemas, enforce checks, and apply safe data transformations while fully leveraging TypeScript's type system. By supporting composable, reusable validation and transformation pipelines, Typestone reduces redundancy, promotes code reuse, and ensures strongly-typed, reliable data handling with an intuitive developer experience.

### Features

- Intuitive API designed to promote clear, maintainable, and modular code.
- Fully type-safe, with strong typing guarantees to improve developer efficiency and confidence.
- Lightweight with zero external dependencies.
- Compatible with [Standard Schema](https://standardschema.dev).

### Use Cases

- Validating and constraining structured outputs produced by AI models.
- Enforcing shared validation rules across client and server applications.
- Validating untrusted form data.
- Embedding data validation checks within CI/CD and test automation workflows.
- Describing data structures with metadata to support documentation, introspection, and tooling.

### Project Status

> [!WARNING]
> This project is in active development but is still in an early, experimental stage.

- The public API is not yet finalized and therefore many breaking changes are expected.
- The library has not yet reached its goal of 100% test coverage.
- The library has not yet created official benchmarks.
- The library is not intended for production use at this time.

## Schemas

Schemas serve as formal contracts that define the expected structure, type, and characteristics of data. They establish a clear blueprint for what constitutes valid input, enabling developers to enforce consistency and correctness throughout an application.

```typescript
import * as t from 'typestone';

const Score = t.number();

Score.parse(0); // 0
Score.parse(''); // TypestoneError: "Expected a number."
```

### Parsing safely

When invoking `parse`, a `TypestoneError` exception will be thrown if the validation fails. To parse without throwing, the `safeParse` method returns a parse result object whose type is a discriminated union, allowing it to be handled in a fully type-safe manner using TypeScript's control-flow narrowing.

```typescript
import * as t from 'typestone';

const Score = t.number();
const result = Score.safeParse(0);

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.issues);
}
```

### Available Schemas

`any`, `array`, `boolean`, `bigint`, `codec`, `date`, `enum`, `intersection`, `lazy`, `literal`, `never`, `null`, `nullable`, `number`, `object`, `optional`, `pipe`, `record`, `string`, `symbol`, `transform`, `tuple`, `undefined`, `union`, `unknown`

## Inferring Types

Every schema and check in Typestone defines both an input and output type, allowing TypeScript to infer types automatically and reducing the need to declare them manually. To get the output type of a schema or check, use `t.Output` or its alias, `t.Infer`.

In most cases, the input type is not required, but it may be necessary when applying complex refinements or transforms. In such situations, you can get the input type using `t.Input`.

```typescript
import * as t from 'typestone';

const Users = t
  .object({
    name: t.string(),
  })
  .array();

type UsersInput = t.Input<typeof Users>; // { name: string }[]
type UsersOutput = t.Output<typeof Users>; // { name: string }[]
type Users = t.Infer<typeof Users>; // { name: string }[]
```

## Checks (Refinements)

Checks, also referred to as refinements, are validators that verify whether an unknown input conforms to an expected output. Each check asserts that a value of a given input type also satisfies the constraints of a more specific, narrowed output type.

```typescript
import * as t from 'typestone';

const Score = t
  .number()
  .check(t.gte(0)) // Checks if greater than or equal to 0.
  .check(t.lte(100)); // Checks if less than or equal to 100.

Score.parse(50); // 50
Score.parse(-1); // TypestoneError: "Must be at least 0."
Score.parse(''); // TypestoneError: "Expected a number."
```

### Chaining Checks

In practice, it is common to reuse the same set of checks across multiple schemas. To address this, Typestone provides a chaining mechanism that allows multiple checks to be composed into a single, reusable unit. This promotes reuse, reduces duplication, and helps keep schema definitions concise while preserving full type safety.

```typescript
const PercentageCheck = t.chain(t.endsWith('%')).chain(
  t.gte(-100).chain(t.lte(100)),
  // We are converting the type from `${string}%` to `${number}%`.
  (value, validate): value is `${number}%` =>
    // Get the value before '%' and convert it to a number.
    validate(Number(value.slice(0, -1))),
);

const Percentage = t.string().check(PercentageCheck);

type Percentage = t.Infer<typeof Percentage>; // `${number}%`
```

As with any scenario where an explicit type is required, full type safety is not guaranteed. Therefore, it's important to ensure that the type matches that of the expected value during runtime.

### Available Checks

`chain`, `condition`, `customCheck`, `email`, `endsWith`, `eq`, `gt`, `gte`, `integer`, `lt`, `lte`, `neq`, `notPadded`, `notPaddedLeft`, `notPaddedRight`, `regex`, `startsWith`, `url`, `uuid`

## Transforms and Pipelines

Transforms are specialized functions within pipelines that convert validated input into a desired output. They apply well-defined, deterministic operations to the data, producing a new representation while ensuring that type safety is maintained throughout the transformation process.

```typescript
import * as t from 'typestone';

const Name = t
  .string()
  .check(t.condition((value) => value === 'Typestone'))
  .pipe(t.toUpperCase());

type NameInput = t.Input<typeof Name>; // `Typestone`
type NameOutput = t.Output<typeof Name>; // `TYPESTONE`
```

### Custom Transforms

There are three types of transforms:

- **Inline Transform**: This is the simplest and most convenient to use since the types of the transform are automatically inferred. It allows for quick, ad-hoc transformations directly within a pipeline, making it ideal for one-off use cases. However, it cannot be reused.
- **Bound Transform**: Defined by assigning a transform to a variable, this transform is reusable across different schemas and pipelines. However, the types are explicitly defined and cannot be inferred. This trade-off makes bound transforms more versatile than inline transforms but with weaker types.
- **Factory Transform**: By using a factory function, transforms are strongly typed, fully inferrable, and repeatable. This comes at a cost of extra verbosity and slightly more overhead as defining a factory transform requires more boilerplate and produces a new instance each time it is invoked.

Application code will typically favor inline or bound transforms for simplicity, while libraries will generally prefer the factory pattern for its stronger typing capabilities.

```typescript
import * as t from 'typestone';

/*
 * Inline Transform
 */

const Message = t
  .custom((value) => value === 'Hello') // "Hello"
  .pipe(t.transform((value) => `${value}!`)); // "Hello!"

/*
 * Bound Transform
 */

const AppendExclamation = t.transform<string, `${string}!`>(
  (value) => `${value}!`,
);

const Message = t
  .custom((value) => value === 'Hello') // "Hello"
  .pipe(AppendExclamation); // `${string}!`

/*
 * Factory Transform
 */

export const appendExclamation = <
  const TInput extends string,
>(): t.TransformSchema<TInput, `${TInput}!`> =>
  t.transform((value) => `${value}!`);

const Message = t
  .custom((value) => value === 'Hello') // "Hello"
  .pipe(appendExclamation()); // "Hello!"
```

### Available Transforms

`toLowerCase`, `toUpperCase`, `trim`, `trimEnd`, `trimStart`

## Codecs

While transforms are unidirectional, codecs are bidirectional, enabling data to be safely and predictably converted in either direction. This two-way behavior is type-safe and makes codecs especially well-suited for serialization, deserialization, and interoperability between differing data representations.

It's important to note that a codec will throw an error if it attempts to parse a transform. This is due to transforms performing a one-way conversion which doesn't allow a codec to deterministically convert in the opposite direction.

```typescript
import * as t from 'typestone';

const StringBool = t.codec({
  // The input schema.
  in: t.boolean(),
  // The output schema.
  out: t.number().check(t.condition((value) => value === 0 || value === 1)),
  // Converts the data before it is parsed by the input schema.
  encode: (value) => Boolean(value),
  // Converts the data before it is parsed by the output schema.
  decode: (value) => (value ? 0 : 1),
});

type StringBoolInput = t.Input<typeof StringBool>; // boolean
type StringBoolOutput = t.Output<typeof StringBool>; // 0 | 1
```

## Error Handling

Most schemas and checks in TypeStone accept an optional `error` argument as their last parameter, providing a mechanism to customize how validation failures are handled. This method of error handling applies specifically to errors generated directly by the schema or check it is attached to, allowing developers to define isolated, context-specific error handling.

```typescript
import * as t from 'typestone';

const Name = t.string('Name must be a string!');

Name.parse(-1); // TypestoneError: "Name must be a string!"
```

Optionally, you can pass in an `ErrorMap` for more control:

```typescript
import * as t from 'typestone';

// Override the default error message for a specific issue.
const Name = t.string({
	invalid_type: 'Name must be a string!',
});

// Pass in a function for more control.
const Name = t.string({
	invalid_type: (issue) => ({
		..issue,
		message: 'Name must be a string!',
		abort: true,
	}),
});

// Or handle any error with any code
const Name = t.string({
	error: (issue) => ({
		..issue,
		message: 'Name must be a string!',
	}),
});
```

## Type Safety

A defining characteristic of Typestone is its rigorous emphasis on strong, statically enforced type safety by maximizing its leverage on TypeScript's type system.

This static typing design provides several significant advantages:

- It enables the TypeScript compiler to detect misapplied or semantically incompatible refinements at compile time, rather than deferring these errors to runtime.
- Developers receive immediate, precise diagnostics that indicate exactly where and why a schema is invalid.
- It prevents logical errors in schema composition, eliminating scenarios where a check might inadvertently violate the schema's contract.
- Because the output type is statically guaranteed to be a subtype of the input, downstream code can rely on increasingly refined data with full type safety, facilitating safer transformations, pipelines, and integrations without additional runtime checks.

```typescript
import * as t from 'typestone';

/*
 * Incompatible checks are detected before runtime
 */

const Name = t.string().check(t.notPadded()).check(t.integer()); // typescript: Type 'number' is not assignable to type 'string'.

/*
 * Checks are automatically inferrable
 */

const Name = t.string().check(
  // TypeScript knows that `value` is a string.
  t.condition((value) => value === 'Typestone'),
);

// Type is inferred as `Typestone`.
type NameOutput = t.Infer<typeof Name>;

/*
 * Transforms are applied to type
 */

const Name = t
  .string()
  .check(t.condition((value) => value === 'Typestone'))
  .pipe(t.toUpperCase());

// Type is inferred as `TYPESTONE`.
type NameOutput = t.Infer<typeof Name>;

/*
 * Codecs are safely typed
 */

const StringBool = t.codec({
  in: t.boolean(),
  out: t.number().check(t.condition((value) => value === 0 || value === 1)),
  // TypeScript knows `value` is either 0 or 1.
  encode: (value) => Boolean(value),
  // TypeScript knows `value` is a string.
  decode: (value) => (value ? 0 : 1),
});

type StringBoolInput = t.Input<typeof StringBool>; // boolean
type StringBoolOutput = t.Output<typeof StringBool>; // 0 | 1

StringBool.encode(''); // typescript: Argument of type 'string' is not assignable to parameter of type '0 | 1'.
StringBool.decode(''); // typescript: Argument of type 'string' is not assignable to parameter of type 'boolean'.

/*
 * Error Maps are strongly typed
 */

// String error maps only support `invalid_type` and `error`.
const Name = t.string({
  too_big: 'Error!', // typescript: Object literal may only specify known properties, and 'too_big' does not exist in type '...'.
});
```

However, a limitation arises when multiple checks share the same primitive type. For example, consider two checks both accepting `string` as input: one requires that the output string ends with an exclamation mark, while the other requires that it ends with a question mark. In this scenario, the schema will never pass at runtime, however, the TypeScript compiler will _not_ flag a type error.

```typescript
import * as t from 'typestone';

// This fails at runtime but is not flagged by TypeScript even though they are logically incompatible.

const Format = t
  .string()
  .check(t.endsWith('!')) // `${string}!`
  .check(t.endsWith('?')); // `${string}?`
```

This behavior was deliberately implemented as a workaround for a limitation in the type system. We cannot make the compiler distinguish more specific constraints on the type without it become overly restrictive. Enforcing stricter type checks in this scenario would make it impractical to compose and reuse checks across different schemas, so the current approach balances type safety with usability.

## Credits

Created by [Kyedo](https://github.com/itskyedo), inspired by [Zod](https://zod.dev) and [Valibot](https://valibot.dev).

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for more details.
