import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck } from '../check/check.ts';
import { regexDef, type RegexErrorMap } from '../regex/def.ts';
import { type RegexCheck } from '../regex/regex.ts';

export type EmailErrorMap = RegexErrorMap;

export interface EmailCheck extends Omit<
  RegexCheck<`${string}@${string}`>,
  'type'
> {
  kind: 'check';
  type: 'email';
}

export function email(
  error?: ErrorHandlerParameter<EmailErrorMap>,
): EmailCheck {
  return createCheck({
    ...regexDef<`${string}@${string}`>(emailRegex, error ?? {}),
    type: 'email',
  });
}

// Based on Zod v4's email regex.
// https://github.com/colinhacks/zod/blob/6e968a3b49cbcb3bffc30c68634e80168e8f2a2e/packages/zod/src/v4/core/regexes.ts#L36-L37
const emailRegex =
  /^(?!\.)(?!.+\.\.)([\w'+\-.]*)[\w+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
