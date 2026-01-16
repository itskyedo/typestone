import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type ComparableType } from '../eq/types.ts';
import { getComparableValue } from '../eq/utils.ts';
import { type LtCheck } from './lt.ts';

export type LtErrorMap = ErrorMap<'too_big'>;

export interface LtDef<
  TType extends ComparableType,
  TValue extends number,
> extends CheckDef<TType, TType, LtErrorMap> {
  readonly type: 'lt';

  readonly value: TValue;
}

export function ltDef<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error: ErrorHandlerParameter<LtErrorMap>,
): LtDef<TType, TValue> {
  return {
    kind: 'check',
    type: 'lt',
    errorMap: errorParamToErrorMap(error),

    value,

    _process,
  };
}

const _process: LtCheck['_process'] = function* (context) {
  const comparable = getComparableValue(context);
  if (comparable.value >= this.value) {
    yield* processIssue(this.errorMap, {
      code: 'too_big',
      path: comparable.path,
      input: context.value,
      expected: this.value,
      received: comparable.value,
      message: `Must be less than ${this.value}.`,
    });
  }
};
