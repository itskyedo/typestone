import {
  transform,
  type TransformSchema,
} from '../../schemas/transform/transform.ts';

export interface ToLowerCaseTransform<
  TInput extends string = string,
> extends TransformSchema<TInput, Lowercase<TInput>> {
  kind: 'schema';
}

export function toLowerCase<
  const TInput extends string,
>(): ToLowerCaseTransform<TInput> {
  return transform((v) => v.toLowerCase() as Lowercase<TInput>);
}
