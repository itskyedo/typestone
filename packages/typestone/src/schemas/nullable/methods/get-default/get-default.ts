import { Wrapper } from '../../../../functions/wrap/wrap.ts';
import { type Schema } from '../../../schema/schema.ts';
import { type NullableSchema } from '../../nullable.ts';
import { type NullableDefaultValue } from '../../types.ts';

export type GetDefaultMethod = typeof getDefault;

export function getDefault<
  TSchema extends Schema,
  TDefaultValue extends NullableDefaultValue<TSchema>,
>(this: NullableSchema<TSchema, TDefaultValue>): TDefaultValue {
  return this._defaultValue instanceof Wrapper
    ? this._defaultValue.inner()
    : this._defaultValue!;
}
