import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import { type ComparableType } from '../eq/types.ts';
import { type GteDef, gteDef, type GteErrorMap } from './def.ts';

export interface GteCheck<
  TType extends ComparableType = ComparableType,
  TValue extends number = number,
> extends DefineCheck<GteDef<TType, TValue>> {
  kind: 'check';
}

export function gte<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error?: ErrorHandlerParameter<GteErrorMap>,
): GteCheck<TType, TValue> {
  return createCheck(gteDef(value, error ?? {}));
}
