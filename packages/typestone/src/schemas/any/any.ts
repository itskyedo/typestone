import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type AnyDef, anyDef } from './def.ts';

export interface AnySchema extends DefineSchema<AnyDef> {
  kind: 'schema';
}

export function any(): AnySchema {
  return createSchema(anyDef());
}
