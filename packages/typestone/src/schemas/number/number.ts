import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type NumberDef, numberDef, type NumberErrorMap } from './def.ts';

export interface NumberSchema extends DefineSchema<NumberDef> {
  kind: 'schema';
}

export function number(
  error?: ErrorHandlerParameter<NumberErrorMap>,
): NumberSchema {
  return createSchema(numberDef(error ?? {}));
}
