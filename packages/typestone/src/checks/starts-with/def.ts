import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type StartsWithCheck } from './starts-with.ts';

export type StartsWithErrorMap = ErrorMap<'invalid_value'>;

export interface StartsWithDef<TValue extends string> extends CheckDef<
  string,
  `${TValue}${string}`,
  StartsWithErrorMap
> {
  readonly type: 'startsWith';

  readonly value: TValue;
}

export function startsWithDef<const TValue extends string>(
  value: TValue,
  error: ErrorHandlerParameter<StartsWithErrorMap>,
): StartsWithDef<TValue> {
  return {
    kind: 'check',
    type: 'startsWith',
    errorMap: errorParamToErrorMap(error),

    value,

    _process,
  };
}

const _process: StartsWithCheck['_process'] = function* (context) {
  if (!context.value.startsWith(this.value)) {
    yield* processIssue(this.errorMap, {
      code: 'invalid_value',
      path: context.path,
      input: context.value,
      message: `Expected value to start with: ${this.value}`,
    });
  }
};
