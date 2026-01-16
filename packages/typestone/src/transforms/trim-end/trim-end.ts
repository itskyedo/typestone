import {
  transform,
  type TransformSchema,
} from '../../schemas/transform/transform.ts';

export interface TrimEndTransform<
  TInput extends string = string,
> extends TransformSchema<TInput, string> {
  kind: 'schema';
}

export function trimEnd<
  const TInput extends string,
>(): TrimEndTransform<TInput> {
  return transform((v) => v.trimEnd());
}
