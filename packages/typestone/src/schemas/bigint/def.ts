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
import { type BigintSchema } from './bigint.ts';

export type BigintErrorMap = ErrorMap<'invalid_type'>;

export interface BigintDef extends SchemaDef<bigint, bigint, BigintErrorMap> {
  readonly type: 'bigint';
}

export function bigintDef(
  error: ErrorHandlerParameter<BigintErrorMap>,
): BigintDef {
  return {
    kind: 'schema',
    type: 'bigint',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    _process,
  };
}

const _process: BigintSchema['_process'] = function* (context) {
  const parsed = parseValue(context.value);
  if (parsed.type !== ValueType.bigint) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.bigint,
      received: parsed.type,
      message: `Expected a ${ValueType.bigint}.`,
    });
  }

  return yield* processChecks(this, context);
};
