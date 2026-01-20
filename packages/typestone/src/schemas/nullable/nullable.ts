import { type RawOutput } from '../../def/def.ts';
import { type MaybeWrapped } from '../../functions/wrap/wrap.ts';
import {
  createSchema,
  type DefineSchema,
  type Schema,
} from '../schema/schema.ts';
import { nullableDef, type NullableDef } from './def.ts';
import {
  getDefault,
  type GetDefaultMethod,
} from './methods/get-default/get-default.ts';
import { type NullableDefaultValue } from './types.ts';

export interface NullableSchema<
  TSchema extends Schema = Schema,
  TDefaultValue extends NullableDefaultValue<TSchema> =
    NullableDefaultValue<TSchema>,
> extends DefineSchema<NullableDef<TSchema, TDefaultValue>> {
  kind: 'schema';

  getDefault: GetDefaultMethod;
}

export function nullable<const TSchema extends Schema>(
  schema: TSchema,
): NullableSchema<TSchema, null>;

export function nullable<
  const TSchema extends Schema,
  const TDefaultValue extends RawOutput<TSchema>,
>(
  schema: TSchema,
  defaultValue: MaybeWrapped<TDefaultValue>,
): NullableSchema<TSchema, TDefaultValue>;

export function nullable(
  schema: Schema,
  defaultValue?: MaybeWrapped<any>,
): NullableSchema {
  return createSchema({
    ...nullableDef(schema, defaultValue),
    getDefault,
  });
}
