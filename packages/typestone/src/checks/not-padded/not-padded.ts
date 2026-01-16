import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck } from '../check/check.ts';
import { regexDef, type RegexErrorMap } from '../regex/def.ts';
import { type RegexCheck } from '../regex/regex.ts';

export type NotPaddedErrorMap = RegexErrorMap;

export interface NotPaddedCheck extends Omit<RegexCheck<string>, 'type'> {
  kind: 'check';
  type: 'notPadded';
}

export function notPadded(
  error?: ErrorHandlerParameter<NotPaddedErrorMap>,
): NotPaddedCheck {
  return createCheck({
    ...regexDef(notPaddedRegex, error ?? {}),
    type: 'notPadded',
  });
}

const notPaddedRegex = /^\s|\s$/;
