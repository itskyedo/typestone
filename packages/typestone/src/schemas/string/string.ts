import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type StringDef, stringDef, type StringErrorMap } from './def.ts';

export interface StringSchema extends DefineSchema<StringDef> {
  kind: 'schema';
}

export function string(
  error?: ErrorHandlerParameter<StringErrorMap>,
): StringSchema {
  return createSchema(stringDef(error ?? {}));
}
