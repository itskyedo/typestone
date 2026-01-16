import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type ConditionCheck } from './condition.ts';
import { type ConditionFunction } from './types.ts';

export type ConditionErrorMap = ErrorMap<'custom'>;

export interface ConditionDef<TInput, TOutput extends TInput> extends CheckDef<
  TInput,
  TOutput,
  ConditionErrorMap
> {
  readonly type: 'condition';

  readonly fn: ConditionFunction<TInput, TOutput>;
}

export function conditionDef<const TInput, const TOutput extends TInput>(
  fn: ConditionFunction<TInput, TOutput>,
  error: ErrorHandlerParameter<ConditionErrorMap>,
): ConditionDef<TInput, TOutput> {
  return {
    kind: 'check',
    type: 'condition',
    errorMap: errorParamToErrorMap(error),

    fn,

    _process,
  };
}

const _process: ConditionCheck['_process'] = function* (context) {
  if (!this.fn(context.value)) {
    yield* processIssue(this.errorMap, {
      code: 'custom',
      input: context.value,
      path: context.path,
      message: 'Invalid input',
    });
  }
};
