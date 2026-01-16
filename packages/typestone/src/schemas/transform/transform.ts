import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type TransformDef, transformDef } from './def.ts';
import { type TransformFunction } from './types.ts';

export interface TransformSchema<
  TInput = unknown,
  TOutput = unknown,
> extends DefineSchema<TransformDef<TInput, TOutput>> {
  kind: 'schema';
}

export function transform<const TInput, const TOutput>(
  transform: TransformFunction<TInput, TOutput>,
): TransformSchema<TInput, TOutput> {
  return createSchema(transformDef(transform));
}
