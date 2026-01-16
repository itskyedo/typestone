import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import { type EndsWithDef, endsWithDef, type EndsWithErrorMap } from './def.ts';

export interface EndsWithCheck<
  TValue extends string = string,
> extends DefineCheck<EndsWithDef<TValue>> {
  kind: 'check';
}

export function endsWith<const TValue extends string>(
  value: TValue,
  error?: ErrorHandlerParameter<EndsWithErrorMap>,
): EndsWithCheck<TValue> {
  return createCheck(endsWithDef(value, error ?? {}));
}
