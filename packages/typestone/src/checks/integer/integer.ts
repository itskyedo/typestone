import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import { type IntegerDef, integerDef, type IntegerErrorMap } from './def.ts';

export interface IntegerCheck extends DefineCheck<IntegerDef> {
  kind: 'check';
}

export function integer(
  error?: ErrorHandlerParameter<IntegerErrorMap>,
): IntegerCheck {
  return createCheck(integerDef(error ?? {}));
}
