import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type BooleanDef, booleanDef, type BooleanErrorMap } from './def.ts';

export interface BooleanSchema extends DefineSchema<BooleanDef> {
  kind: 'schema';
}

export function boolean(
  error?: ErrorHandlerParameter<BooleanErrorMap>,
): BooleanSchema {
  return createSchema(booleanDef(error ?? {}));
}
