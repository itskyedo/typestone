import {
  type ReplaceSchemaTypes,
  type Schema,
} from '../../schemas/schema/schema.ts';

export type Refine<TSchema extends Schema, TNext> = ReplaceSchemaTypes<
  TSchema,
  TNext,
  TNext
> & {};
