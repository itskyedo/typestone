import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import { type EqDef, eqDef, type EqErrorMap } from './def.ts';
import { type ComparableType } from './types.ts';

export interface EqCheck<
  TType extends ComparableType = ComparableType,
  TValue extends number = number,
> extends DefineCheck<EqDef<TType, TValue>> {
  kind: 'check';
}

export function eq<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error?: ErrorHandlerParameter<EqErrorMap>,
): EqCheck<TType, TValue> {
  return createCheck(eqDef(value, error ?? {}));
}
