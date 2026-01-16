import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type BigintDef, bigintDef, type BigintErrorMap } from './def.ts';

export interface BigintSchema extends DefineSchema<BigintDef> {
  kind: 'schema';
}

export function bigint(
  error?: ErrorHandlerParameter<BigintErrorMap>,
): BigintSchema {
  return createSchema(bigintDef(error ?? {}));
}
