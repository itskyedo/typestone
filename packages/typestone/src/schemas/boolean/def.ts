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
import { type BooleanSchema } from './boolean.ts';

export type BooleanErrorMap = ErrorMap<'invalid_type'>;

export interface BooleanDef extends SchemaDef<
  boolean,
  boolean,
  BooleanErrorMap
> {
  readonly type: 'boolean';
}

export function booleanDef(
  error: ErrorHandlerParameter<BooleanErrorMap>,
): BooleanDef {
  return {
    kind: 'schema',
    type: 'boolean',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    _process,
  };
}

const _process: BooleanSchema['_process'] = function* (context) {
  const parsed = parseValue(context.value);
  if (parsed.type !== ValueType.boolean) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.boolean,
      received: parsed.type,
      message: `Expected a ${ValueType.boolean}.`,
    });
  }

  return yield* processChecks(this, context);
};
