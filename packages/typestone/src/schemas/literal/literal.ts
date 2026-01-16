import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type LiteralDef, literalDef, type LiteralErrorMap } from './def.ts';
import {
  getValue,
  type GetValueMethod,
} from './methods/get-value/get-value.ts';
import {
  value as valueMethod,
  type ValueMethod,
} from './methods/value/value.ts';
import { type LiteralValues } from './types.ts';

export interface LiteralSchema<
  TValues extends LiteralValues = LiteralValues,
> extends DefineSchema<LiteralDef<TValues>> {
  kind: 'schema';

  getValue: GetValueMethod;
  value: ValueMethod;
}

export function literal<const TValues extends LiteralValues>(
  value: TValues,
  error?: ErrorHandlerParameter<LiteralErrorMap>,
): LiteralSchema<TValues> {
  return createSchema({
    ...literalDef(value, error ?? {}),
    getValue,
    value: valueMethod,
  });
}
