import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type ComparableType } from '../eq/types.ts';
import { getComparableValue } from '../eq/utils.ts';
import { type GteCheck } from './gte.ts';

export type GteErrorMap = ErrorMap<'too_small'>;

export interface GteDef<
  TType extends ComparableType,
  TValue extends number,
> extends CheckDef<TType, TType, GteErrorMap> {
  readonly type: 'gte';

  readonly value: TValue;
}

export function gteDef<
  const TType extends ComparableType,
  const TValue extends number,
>(
  value: TValue,
  error: ErrorHandlerParameter<GteErrorMap>,
): GteDef<TType, TValue> {
  return {
    kind: 'check',
    type: 'gte',
    errorMap: errorParamToErrorMap(error),

    value,

    _process,
  };
}

const _process: GteCheck['_process'] = function* (context) {
  const comparable = getComparableValue(context);
  if (comparable.value < this.value) {
    yield* processIssue(this.errorMap, {
      code: 'too_small',
      path: comparable.path,
      input: context.value,
      expected: this.value,
      received: comparable.value,
      message: `Must be at least ${this.value}.`,
    });
  }
};
