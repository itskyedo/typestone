import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type NeverDef, neverDef, type NeverErrorMap } from './def.ts';

export interface NeverSchema extends DefineSchema<NeverDef> {
  kind: 'schema';
}

export function never(
  error?: ErrorHandlerParameter<NeverErrorMap>,
): NeverSchema {
  return createSchema(neverDef(error ?? {}));
}
