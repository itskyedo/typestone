import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type DateDef, dateDef, type DateErrorMap } from './def.ts';

export interface DateSchema extends DefineSchema<DateDef> {
  kind: 'schema';
}

export function date(error?: ErrorHandlerParameter<DateErrorMap>): DateSchema {
  return createSchema(dateDef(error ?? {}));
}
