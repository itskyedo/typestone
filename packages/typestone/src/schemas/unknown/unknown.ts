import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type UnknownDef, unknownDef } from './def.ts';

export interface UnknownSchema extends DefineSchema<UnknownDef> {
  kind: 'schema';
}

export function unknown(): UnknownSchema {
  return createSchema(unknownDef());
}
