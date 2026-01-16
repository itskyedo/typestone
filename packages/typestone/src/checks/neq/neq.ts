import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import { type ComparableType } from '../eq/types.ts';
import { type NeqDef, neqDef, type NeqErrorMap } from './def.ts';

export interface NeqCheck<
  TType extends ComparableType = ComparableType,
  TValue extends number = number,
> extends DefineCheck<NeqDef<TType, TValue>> {
  kind: 'check';
}

export function neq<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error?: ErrorHandlerParameter<NeqErrorMap>,
): NeqCheck<TType, TValue> {
  return createCheck(neqDef(value, error ?? {}));
}
