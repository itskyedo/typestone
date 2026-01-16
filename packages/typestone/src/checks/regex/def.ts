import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type RegexCheck } from './regex.ts';

export type RegexErrorMap = ErrorMap<'invalid_format'>;

export interface RegexDef<TAssertion extends string> extends CheckDef<
  string,
  TAssertion,
  RegexErrorMap
> {
  readonly type: 'regex';

  readonly pattern: RegExp;
}

export function regexDef<const TAssertion extends string>(
  pattern: RegExp,
  error: ErrorHandlerParameter<RegexErrorMap>,
): RegexDef<TAssertion> {
  return {
    kind: 'check',
    type: 'regex',
    errorMap: errorParamToErrorMap(error),

    pattern,

    _process,
  };
}

const _process: RegexCheck['_process'] = function* (context) {
  if (!this.pattern.test(context.value)) {
    yield* processIssue(this.errorMap, {
      code: 'invalid_format',
      format: 'regex',
      path: context.path,
      input: context.value,
      message: 'Invalid format.',
    });
  }
};
