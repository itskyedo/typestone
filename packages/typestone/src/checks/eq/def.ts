import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type EqCheck } from './eq.ts';
import { type ComparableType } from './types.ts';
import { getComparableValue } from './utils.ts';

export type EqErrorMap = ErrorMap<'invalid_value'>;

export interface EqDef<
  TType extends ComparableType,
  TValue extends number,
> extends CheckDef<TType, TType, EqErrorMap> {
  readonly type: 'eq';

  readonly value: TValue;
}

export function eqDef<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error: ErrorHandlerParameter<EqErrorMap>,
): EqDef<TType, TValue> {
  return {
    kind: 'check',
    type: 'eq',
    errorMap: errorParamToErrorMap(error),

    value,

    _process,
  };
}

const _process: EqCheck['_process'] = function* (context) {
  const comparable = getComparableValue(context);
  if (comparable.value !== this.value) {
    yield* processIssue(this.errorMap, {
      code: 'invalid_value',
      path: comparable.path,
      input: context.value,
      expected: this.value,
      received: comparable.value,
      message: `Must equal ${this.value}.`,
    });
  }
};
