import { type DefineSchema, type Schema } from '../schema/schema.ts';
import { type NullableDef } from './def.ts';
import { type GetDefaultMethod } from './methods/get-default/get-default.ts';
import { type NullableDefaultValue } from './types.ts';

export interface NullableSchema<
  TSchema extends Schema = Schema,
  TDefaultValue extends NullableDefaultValue<TSchema> =
    NullableDefaultValue<TSchema>,
> extends DefineSchema<NullableDef<TSchema, TDefaultValue>> {
  kind: 'schema';

  getDefault: GetDefaultMethod;
}
