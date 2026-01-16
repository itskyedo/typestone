import { type DefineSchema, type Schema } from '../schema/schema.ts';
import { type OptionalDef } from './def.ts';
import { type GetDefaultMethod } from './methods/get-default/get-default.ts';
import { type OptionalDefaultValue } from './types.ts';

export interface OptionalSchema<
  TSchema extends Schema = Schema,
  TDefaultValue extends OptionalDefaultValue<TSchema> =
    OptionalDefaultValue<TSchema>,
> extends DefineSchema<OptionalDef<TSchema, TDefaultValue>> {
  kind: 'schema';

  getDefault: GetDefaultMethod;
}
