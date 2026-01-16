import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type EndsWithCheck } from './ends-with.ts';

export type EndsWithErrorMap = ErrorMap<'invalid_value'>;

export interface EndsWithDef<TValue extends string> extends CheckDef<
  string,
  `${string}${TValue}`,
  EndsWithErrorMap
> {
  readonly type: 'endsWith';

  readonly value: TValue;
}

export function endsWithDef<const TValue extends string>(
  value: TValue,
  error: ErrorHandlerParameter<EndsWithErrorMap>,
): EndsWithDef<TValue> {
  return {
    kind: 'check',
    type: 'endsWith',
    errorMap: errorParamToErrorMap(error),

    value,

    _process,
  };
}

const _process: EndsWithCheck['_process'] = function* (context) {
  if (!context.value.endsWith(this.value)) {
    yield* processIssue(this.errorMap, {
      code: 'invalid_value',
      path: context.path,
      input: context.value,
      message: `Expected value to start with: ${this.value}`,
    });
  }
};
