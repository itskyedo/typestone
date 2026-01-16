import { type LiteralSchema } from '../../literal.ts';
import { type InferLiteralValue, type LiteralValues } from '../../types.ts';

export type ValueMethod = typeof value;

export function value<
  TValues extends LiteralValues,
  TValue extends InferLiteralValue<TValues>,
>(this: LiteralSchema<TValues>, value: TValue): TValue {
  if (!this.values.has(value)) {
    throw new Error('Invalid literal value.');
  }

  return value;
}
