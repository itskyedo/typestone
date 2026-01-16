import { type ErrorMap } from '../../error/error.ts';
import { NEVER } from '../../internal/constants/constants.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processContext } from '../../internal/process/process-context.ts';
import { type Context } from '../../internal/process/types.ts';
import { type SchemaDef } from '../schema/schema.ts';
import { type TransformSchema } from './transform.ts';
import { type TransformFunction } from './types.ts';

export type TransformErrorMap = ErrorMap<never>;

export interface TransformDef<TInput, TOutput> extends SchemaDef<
  TInput,
  TOutput,
  TransformErrorMap
> {
  readonly type: 'transform';

  readonly transform: TransformFunction<TInput, TOutput>;
}

export function transformDef<const TInput, const TOutput>(
  transform: TransformFunction<TInput, TOutput>,
): TransformDef<TInput, TOutput> {
  return {
    kind: 'schema',
    type: 'transform',
    checks: [],
    errorMap: {},

    transform,

    _process,
  };
}

const _process: TransformSchema<unknown, unknown>['_process'] = function* (
  context,
) {
  if (context.mode !== 'decode') {
    throw new Error('Transforms are unidirectional and cannot be encoded.');
  }

  const transformContext: Context = {
    path: [...context.path],
    issues: [],
  };

  const newData = this.transform(context.value, transformContext);
  const transformResult = yield* processContext(transformContext);
  if (!transformResult.success) {
    return NEVER;
  }

  return yield* processChecks(this, {
    ...context,
    value: newData,
  });
};
