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
import { type StringSchema } from './string.ts';

export type StringErrorMap = ErrorMap<'invalid_type'>;

export interface StringDef extends SchemaDef<string, string, StringErrorMap> {
  readonly type: 'string';
}

export function stringDef(
  error: ErrorHandlerParameter<StringErrorMap>,
): StringDef {
  return {
    kind: 'schema',
    type: 'string',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    _process,
  };
}

const _process: StringSchema['_process'] = function* (context) {
  const parsed = parseValue(context.value);
  if (parsed.type !== ValueType.string) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.string,
      received: parsed.type,
      message: `Expected a ${ValueType.string}.`,
    });
  }

  return yield* processChecks(this, context);
};
