import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import {
  getValueType,
  ValueType,
} from '../../internal/value-type/value-type.ts';
import { type SchemaDef } from '../schema/schema.ts';
import { type UndefinedSchema } from './undefined.ts';

export type UndefinedErrorMap = ErrorMap<'invalid_type'>;

export interface UndefinedDef extends SchemaDef<
  undefined,
  undefined,
  UndefinedErrorMap
> {
  readonly type: 'undefined';
}

export function undefinedDef(
  error: ErrorHandlerParameter<UndefinedErrorMap>,
): UndefinedDef {
  return {
    kind: 'schema',
    type: 'undefined',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    _process,
  };
}

const _process: UndefinedSchema['_process'] = function* (context) {
  if (typeof context.value !== 'undefined') {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.undefined,
      received: getValueType(context.value),
      message: `Expected ${ValueType.undefined}.`,
    });
  }

  return yield* processChecks(this, context);
};
