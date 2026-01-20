import { type RawOutput } from '../../def/def.ts';
import { type MaybeWrapped } from '../../functions/wrap/wrap.ts';
import {
  createSchema,
  type DefineSchema,
  type Schema,
} from '../schema/schema.ts';
import { optionalDef, type OptionalDef } from './def.ts';
import {
  getDefault,
  type GetDefaultMethod,
} from './methods/get-default/get-default.ts';
import { type OptionalDefaultValue } from './types.ts';

export interface OptionalSchema<
  TSchema extends Schema = Schema,
  TDefaultValue extends OptionalDefaultValue<TSchema> =
    OptionalDefaultValue<TSchema>,
> extends DefineSchema<OptionalDef<TSchema, TDefaultValue>> {
  kind: 'schema';

  getDefault: GetDefaultMethod;
}

export function optional<const TSchema extends Schema>(
  schema: TSchema,
): OptionalSchema<TSchema, null>;

export function optional<
  const TSchema extends Schema,
  const TDefaultValue extends RawOutput<TSchema>,
>(
  schema: TSchema,
  defaultValue: MaybeWrapped<TDefaultValue>,
): OptionalSchema<TSchema, TDefaultValue>;

export function optional(
  schema: Schema,
  defaultValue?: MaybeWrapped<any>,
): OptionalSchema {
  return createSchema({
    ...optionalDef(schema, defaultValue),
    getDefault,
  });
}
