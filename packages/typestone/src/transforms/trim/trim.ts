import {
  transform,
  type TransformSchema,
} from '../../schemas/transform/transform.ts';

export interface TrimTransform<
  TInput extends string = string,
> extends TransformSchema<TInput, string> {
  kind: 'schema';
}

export function trim<const TInput extends string>(): TrimTransform<TInput> {
  return transform((v) => v.trim());
}
