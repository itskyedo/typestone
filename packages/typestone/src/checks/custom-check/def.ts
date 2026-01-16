import { type ErrorMap } from '../../error/error.ts';
import { processContext } from '../../internal/process/process-context.ts';
import { type Context } from '../../internal/process/types.ts';
import { type CheckDef } from '../check/check.ts';
import { type CustomCheck } from './custom-check.ts';
import { type CustomCheckFunction } from './types.ts';

export type CustomCheckErrorMap = ErrorMap<never>;

export interface CustomCheckDef<
  TInput,
  TOutput extends TInput,
> extends CheckDef<TInput, TOutput, CustomCheckErrorMap> {
  readonly type: 'custom';

  readonly fn: CustomCheckFunction<TInput>;
}

export function customCheckDef<const TInput, const TOutput extends TInput>(
  fn: CustomCheckFunction<TInput>,
): CustomCheckDef<TInput, TOutput> {
  return {
    kind: 'check',
    type: 'custom',
    errorMap: {},

    fn,

    _process,
  };
}

const _process: CustomCheck['_process'] = function* (context) {
  const fnContext: Context = {
    path: [...context.path],
    issues: [],
  };

  const result = this.fn(context.value, fnContext);
  yield* processContext(fnContext);

  const failWithDefaultError = !fnContext.issues.length && result === false;
  if (failWithDefaultError) {
    yield {
      code: 'custom',
      input: context.value,
      path: context.path,
      message: 'Invalid input',
    };
  }
};
