import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck } from '../check/check.ts';
import { type NotPaddedErrorMap } from '../not-padded/not-padded.ts';
import { regexDef, type RegexErrorMap } from '../regex/def.ts';
import { type RegexCheck } from '../regex/regex.ts';

export type NotPaddedRightErrorMap = RegexErrorMap;

export interface NotPaddedRightCheck extends Omit<RegexCheck<string>, 'type'> {
  kind: 'check';
  type: 'notPaddedRight';
}

export function notPaddedRight(
  error?: ErrorHandlerParameter<NotPaddedErrorMap>,
): NotPaddedRightCheck {
  return createCheck({
    ...regexDef(notPaddedRightRegex, error ?? {}),
    type: 'notPaddedRight',
  });
}

const notPaddedRightRegex = /\s$/;
