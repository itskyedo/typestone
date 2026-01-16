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
import { type DateSchema } from './date.ts';
import { isValidDate } from './utils.ts';

export type DateErrorMap = ErrorMap<'invalid_type'>;

export interface DateDef extends SchemaDef<Date, Date, DateErrorMap> {
  readonly type: 'date';
}

export function dateDef(error: ErrorHandlerParameter<ErrorMap>): DateDef {
  return {
    kind: 'schema',
    type: 'date',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    _process,
  };
}

const _process: DateSchema['_process'] = function* (context) {
  if (!isValidDate(context.value)) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.date,
      received: getValueType(context.value),
      message: 'Invalid date.',
    });
  }

  return yield* processChecks(this, context);
};
