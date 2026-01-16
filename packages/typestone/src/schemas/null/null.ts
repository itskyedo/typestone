import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type NullDef, nullDef, type NullErrorMap } from './def.ts';

export interface NullSchema extends DefineSchema<NullDef> {
  kind: 'schema';
}

function _null(error?: ErrorHandlerParameter<NullErrorMap>): NullSchema {
  return createSchema(nullDef(error ?? {}));
}

export { _null as null };
