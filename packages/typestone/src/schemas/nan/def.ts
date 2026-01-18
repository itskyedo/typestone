import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import {
  parseValue,
  ValueType,
} from '../../internal/parse-value/parse-value.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type SchemaDef } from '../schema/schema.ts';
import { type NanSchema } from './nan.ts';

export type NanErrorMap = ErrorMap<'invalid_type'>;

export interface NanDef extends SchemaDef<number, number, NanErrorMap> {
  readonly type: 'nan';
}

export function nanDef(error: ErrorHandlerParameter<NanErrorMap>): NanDef {
  return {
    kind: 'schema',
    type: 'nan',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    _process,
  };
}

const _process: NanSchema['_process'] = function* (context) {
  const parsed = parseValue(context.value);
  if (parsed.type !== ValueType.nan) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.nan,
      received: parsed.type,
      message: `Expected ${ValueType.nan}.`,
    });
  }

  return yield* processChecks(this, context);
};
