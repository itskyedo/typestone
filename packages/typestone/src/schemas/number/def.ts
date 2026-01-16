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
import { type NumberSchema } from './number.ts';

export type NumberErrorMap = ErrorMap<'invalid_type'>;

export interface NumberDef extends SchemaDef<number, number, NumberErrorMap> {
  readonly type: 'number';
}

export function numberDef(
  error: ErrorHandlerParameter<NumberErrorMap>,
): NumberDef {
  return {
    kind: 'schema',
    type: 'number',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    _process,
  };
}

const _process: NumberSchema['_process'] = function* (context) {
  if (typeof context.value !== 'number') {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.number,
      received: getValueType(context.value),
      message: `Expected a ${ValueType.number}.`,
    });
  }

  return yield* processChecks(this, context);
};
