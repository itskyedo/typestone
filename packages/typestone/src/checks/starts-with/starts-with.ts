import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import {
  type StartsWithDef,
  startsWithDef,
  type StartsWithErrorMap,
} from './def.ts';

export interface StartsWithCheck<
  TValue extends string = string,
> extends DefineCheck<StartsWithDef<TValue>> {
  kind: 'check';
}

export function startsWith<const TValue extends string>(
  value: TValue,
  error?: ErrorHandlerParameter<StartsWithErrorMap>,
): StartsWithCheck<TValue> {
  return createCheck(startsWithDef(value, error ?? {}));
}
