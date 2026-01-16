import {
  transform,
  type TransformSchema,
} from '../../schemas/transform/transform.ts';

export interface ToUpperCaseTransform<
  TInput extends string = string,
> extends TransformSchema<TInput, Uppercase<TInput>> {
  kind: 'schema';
}

export function toUpperCase<
  const TInput extends string,
>(): ToUpperCaseTransform<TInput> {
  return transform((v) => v.toUpperCase() as Uppercase<TInput>);
}
