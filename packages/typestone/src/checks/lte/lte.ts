import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import { type ComparableType } from '../eq/types.ts';
import { type LteDef, lteDef, type LteErrorMap } from './def.ts';

export interface LteCheck<
  TType extends ComparableType = ComparableType,
  TValue extends number = number,
> extends DefineCheck<LteDef<TType, TValue>> {
  kind: 'check';
}

export function lte<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error?: ErrorHandlerParameter<LteErrorMap>,
): LteCheck<TType, TValue> {
  return createCheck(lteDef(value, error ?? {}));
}
