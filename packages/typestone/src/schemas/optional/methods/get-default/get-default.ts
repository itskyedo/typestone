import { Wrapper } from '../../../../functions/wrap/wrap.ts';
import { type Schema } from '../../../schema/schema.ts';
import { type OptionalSchema } from '../../optional.ts';
import { type OptionalDefaultValue } from '../../types.ts';

export type GetDefaultMethod = typeof getDefault;

export function getDefault<
  TSchema extends Schema,
  TDefaultValue extends OptionalDefaultValue<TSchema>,
>(this: OptionalSchema<TSchema, TDefaultValue>): TDefaultValue {
  return this._defaultValue instanceof Wrapper
    ? this._defaultValue.inner()
    : this._defaultValue!;
}
