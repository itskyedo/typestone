import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import { type ComparableType } from '../eq/types.ts';
import { type LtDef, ltDef, type LtErrorMap } from './def.ts';

export interface LtCheck<
  TType extends ComparableType = ComparableType,
  TValue extends number = number,
> extends DefineCheck<LtDef<TType, TValue>> {
  kind: 'check';
}

export function lt<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error?: ErrorHandlerParameter<LtErrorMap>,
): LtCheck<TType, TValue> {
  return createCheck(ltDef(value, error ?? {}));
}
