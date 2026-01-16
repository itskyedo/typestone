import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type ComparableType } from '../eq/types.ts';
import { getComparableValue } from '../eq/utils.ts';
import { type NeqCheck } from './neq.ts';

export type NeqErrorMap = ErrorMap<'invalid_value'>;

export interface NeqDef<
  TType extends ComparableType,
  TValue extends number,
> extends CheckDef<TType, TType, NeqErrorMap> {
  readonly type: 'neq';

  readonly value: TValue;
}

export function neqDef<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error: ErrorHandlerParameter<NeqErrorMap>,
): NeqDef<TType, TValue> {
  return {
    kind: 'check',
    type: 'neq',
    errorMap: errorParamToErrorMap(error),

    value,

    _process,
  };
}

const _process: NeqCheck['_process'] = function* (context) {
  const comparable = getComparableValue(context);
  if (comparable.value === this.value) {
    yield* processIssue(this.errorMap, {
      code: 'invalid_value',
      path: comparable.path,
      input: context.value,
      expected: this.value,
      received: comparable.value,
      message: `Must not equal ${this.value}.`,
    });
  }
};
