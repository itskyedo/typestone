import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import { type ComparableType } from '../eq/types.ts';
import { type GtDef, gtDef, type GtErrorMap } from './def.ts';

export interface GtCheck<
  TType extends ComparableType = ComparableType,
  TValue extends number = number,
> extends DefineCheck<GtDef<TType, TValue>> {
  kind: 'check';
}

export function gt<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error?: ErrorHandlerParameter<GtErrorMap>,
): GtCheck<TType, TValue> {
  return createCheck(gtDef(value, error ?? {}));
}
