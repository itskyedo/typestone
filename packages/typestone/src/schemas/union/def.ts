import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { type Issue } from '../../error/issues.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processGenerator } from '../../internal/process/process-generator.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type SchemaDef } from '../schema/schema.ts';
import {
  type UnionInput,
  type UnionOptions,
  type UnionOutput,
} from './types.ts';
import { type UnionSchema } from './union.ts';

export type UnionErrorMap = ErrorMap<'invalid_union'>;

export interface UnionDef<TOptions extends UnionOptions> extends SchemaDef<
  UnionInput<TOptions>,
  UnionOutput<TOptions>,
  UnionErrorMap
> {
  readonly type: 'union';

  readonly options: TOptions;
}

export function unionDef<const TOptions extends UnionOptions>(
  options: TOptions,
  error: ErrorHandlerParameter<UnionErrorMap>,
): UnionDef<TOptions> {
  return {
    kind: 'schema',
    type: 'union',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    options,

    _process,
  };
}

const _process: UnionSchema['_process'] = function* (context) {
  let unionIssues: { issues: Issue[] }[] = [];
  let newData: unknown;

  for (const option of this.options) {
    const issues: Issue[] = [];
    const iterator = processGenerator(option._process(context));
    let iteration = iterator.next();

    while (!iteration.done) {
      issues.push(iteration.value);
      if (iteration.value.abort) break;
      iteration = iterator.next();
    }

    if (iteration.done && iteration.value.success && !issues.length) {
      newData = iteration.value.data;
      unionIssues = [];
      break;
    } else {
      unionIssues.push({ issues });
    }
  }

  if (unionIssues.length) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_union',
      path: context.path,
      input: context.value,
      unionIssues,
      message: 'Invalid value.',
    });
  }

  return yield* processChecks(this, {
    ...context,
    value: newData,
  });
};
