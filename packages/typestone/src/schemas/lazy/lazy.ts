import {
  createSchema,
  type DefineSchema,
  type Schema,
} from '../schema/schema.ts';
import { type LazyDef, lazyDef } from './def.ts';

export interface LazySchema<
  TSchema extends Schema = Schema,
> extends DefineSchema<LazyDef<TSchema>> {
  kind: 'schema';
}

export function lazy<const TSchema extends Schema>(
  fn: () => TSchema,
): LazySchema<TSchema> {
  return createSchema(lazyDef(fn));
}
