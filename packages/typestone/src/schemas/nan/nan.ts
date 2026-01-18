import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type NanDef, nanDef, type NanErrorMap } from './def.ts';

export interface NanSchema extends DefineSchema<NanDef> {
  kind: 'schema';
}

export function nan(error?: ErrorHandlerParameter<NanErrorMap>): NanSchema {
  return createSchema(nanDef(error ?? {}));
}
