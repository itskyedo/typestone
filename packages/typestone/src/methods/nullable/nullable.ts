import { type RawOutput } from '../../def/def.ts';
import { type MaybeWrapped } from '../../functions/wrap/wrap.ts';
import { nullableDef } from '../../schemas/nullable/def.ts';
import { getDefault } from '../../schemas/nullable/methods/get-default/get-default.ts';
import { type NullableSchema } from '../../schemas/nullable/nullable.ts';
import {
  type CreateSchemaFunction,
  type Schema,
} from '../../schemas/schema/schema.ts';

export interface NullableMethod {
  <const TSchema extends Schema>(this: TSchema): NullableSchema<TSchema, null>;

  <
    const TSchema extends Schema,
    const TDefaultValue extends RawOutput<TSchema>,
  >(
    this: TSchema,
    defaultValue: MaybeWrapped<TDefaultValue>,
  ): NullableSchema<TSchema, TDefaultValue>;
}

export const attachNullable: (
  attach: CreateSchemaFunction,
) => NullableMethod = (attach) =>
  function (this: Schema, defaultValue?: MaybeWrapped<any>) {
    return attach({
      ...nullableDef(this, defaultValue),
      getDefault,
    });
  };
