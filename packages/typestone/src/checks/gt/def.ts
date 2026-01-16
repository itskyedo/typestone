import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type ComparableType } from '../eq/types.ts';
import { getComparableValue } from '../eq/utils.ts';
import { type GtCheck } from './gt.ts';

export type GtErrorMap = ErrorMap<'too_small'>;

export interface GtDef<
  TType extends ComparableType,
  TValue extends number,
> extends CheckDef<TType, TType, GtErrorMap> {
  readonly type: 'gt';

  readonly value: TValue;
}

export function gtDef<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error: ErrorHandlerParameter<GtErrorMap>,
): GtDef<TType, TValue> {
  return {
    kind: 'check',
    type: 'gt',
    errorMap: errorParamToErrorMap(error),

    value,

    _process,
  };
}

const _process: GtCheck['_process'] = function* (context) {
  const comparable = getComparableValue(context);
  if (comparable.value <= this.value) {
    yield* processIssue(this.errorMap, {
      code: 'too_small',
      path: comparable.path,
      input: context.value,
      expected: this.value,
      received: comparable.value,
      message: `Must be greater than ${this.value}.`,
    });
  }
};
