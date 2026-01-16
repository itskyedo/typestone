import { type RawOutput } from '../../def/def.ts';
import { type MaybeWrapped } from '../../functions/wrap/wrap.ts';
import { optionalDef } from '../../schemas/optional/def.ts';
import { getDefault } from '../../schemas/optional/methods/get-default/get-default.ts';
import { type OptionalSchema } from '../../schemas/optional/optional.ts';
import {
  type CreateSchemaFunction,
  type Schema,
} from '../../schemas/schema/schema.ts';

export interface OptionalMethod {
  <const TSchema extends Schema>(
    this: TSchema,
  ): OptionalSchema<TSchema, undefined>;

  <
    const TSchema extends Schema,
    const TDefaultValue extends RawOutput<TSchema>,
  >(
    this: TSchema,
    defaultValue: MaybeWrapped<TDefaultValue>,
  ): OptionalSchema<TSchema, TDefaultValue>;
}

export const attachOptional: (
  attach: CreateSchemaFunction,
) => OptionalMethod = (attach) =>
  function (this: Schema, defaultValue?: MaybeWrapped<any>) {
    return attach({
      ...optionalDef(this, defaultValue),
      getDefault,
    });
  };
