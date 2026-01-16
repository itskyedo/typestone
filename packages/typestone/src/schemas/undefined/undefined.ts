import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import {
  type UndefinedDef,
  undefinedDef,
  type UndefinedErrorMap,
} from './def.ts';

export interface UndefinedSchema extends DefineSchema<UndefinedDef> {
  kind: 'schema';
}

function _undefined(
  error?: ErrorHandlerParameter<UndefinedErrorMap>,
): UndefinedSchema {
  return createSchema(undefinedDef(error ?? {}));
}

export { _undefined as undefined };
