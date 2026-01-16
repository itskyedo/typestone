import { type LiteralSchema } from '../../literal.ts';
import { type LiteralValue, type LiteralValues } from '../../types.ts';

export type GetValueMethod = typeof getValue;

export function getValue<TValues extends LiteralValues>(
  this: LiteralSchema<TValues>,
): Extract<TValues, LiteralValue> {
  if (this.values.size > 1) {
    throw new Error(
      'Literal schema contains more than one value. Use `values` or `value()` instead.',
    );
  }

  return this.values.values().next().value as Extract<TValues, LiteralValue>;
}
