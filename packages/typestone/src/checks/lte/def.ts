import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type ComparableType } from '../eq/types.ts';
import { getComparableValue } from '../eq/utils.ts';
import { type LteCheck } from './lte.ts';

export type LteErrorMap = ErrorMap<'too_big'>;

export interface LteDef<
  TType extends ComparableType,
  TValue extends number,
> extends CheckDef<TType, TType, LteErrorMap> {
  readonly type: 'lte';

  readonly value: TValue;
}

export function lteDef<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error: ErrorHandlerParameter<LteErrorMap>,
): LteDef<TType, TValue> {
  return {
    kind: 'check',
    type: 'lte',
    errorMap: errorParamToErrorMap(error),

    value,

    _process,
  };
}

const _process: LteCheck['_process'] = function* (context) {
  const comparable = getComparableValue(context);
  if (comparable.value > this.value) {
    yield* processIssue(this.errorMap, {
      code: 'too_big',
      path: comparable.path,
      input: context.value,
      expected: this.value,
      received: comparable.value,
      message: `Cannot be greater than ${this.value}.`,
    });
  }
};
