import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type SchemaDef } from '../schema/schema.ts';
import { type CustomSchema } from './custom.ts';
import { type CustomFunction } from './types.ts';

export type CustomErrorMap = ErrorMap<'custom'>;

export interface CustomDef<TType> extends SchemaDef<
  TType,
  TType,
  CustomErrorMap
> {
  readonly type: 'custom';

  readonly fn: CustomFunction<TType>;
}

export function customDef<const TType>(
  fn: CustomFunction<TType>,
  error: ErrorHandlerParameter<CustomErrorMap>,
): CustomDef<TType> {
  return {
    kind: 'schema',
    type: 'custom',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    fn,

    _process,
  };
}

const _process: CustomSchema['_process'] = function* (context) {
  if (!this.fn(context.value)) {
    return yield* processIssue(this.errorMap, {
      code: 'custom',
      input: context.value,
      path: context.path,
      message: 'Invalid input',
    });
  }

  return yield* processChecks(this, context);
};
