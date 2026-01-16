import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck } from '../check/check.ts';
import { regexDef, type RegexErrorMap } from '../regex/def.ts';
import { type RegexCheck } from '../regex/regex.ts';

export type NotPaddedLeftErrorMap = RegexErrorMap;

export interface NotPaddedLeftCheck extends Omit<RegexCheck<string>, 'type'> {
  kind: 'check';
  type: 'notPaddedLeft';
}

export function notPaddedLeft(
  error?: ErrorHandlerParameter<NotPaddedLeftErrorMap>,
): NotPaddedLeftCheck {
  return createCheck({
    ...regexDef(notPaddedLeftRegex, error ?? {}),
    type: 'notPaddedLeft',
  });
}

const notPaddedLeftRegex = /^\s/;
