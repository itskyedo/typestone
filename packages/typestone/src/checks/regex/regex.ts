import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import { type RegexDef, regexDef, type RegexErrorMap } from './def.ts';

export interface RegexCheck<
  TAssertion extends string = string,
> extends DefineCheck<RegexDef<TAssertion>> {
  kind: 'check';
}

export function regex<const TAssertion extends string>(
  pattern: RegExp,
  error?: ErrorHandlerParameter<RegexErrorMap>,
): RegexCheck<TAssertion> {
  return createCheck(regexDef(pattern, error ?? {}));
}
