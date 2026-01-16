import {
  transform,
  type TransformSchema,
} from '../../schemas/transform/transform.ts';

export interface TrimStartTransform<
  TInput extends string = string,
> extends TransformSchema<TInput, string> {
  kind: 'schema';
}

export function trimStart<
  const TInput extends string,
>(): TrimStartTransform<TInput> {
  return transform((v) => v.trimStart());
}
