import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import {
  parseValue,
  ValueType,
} from '../../internal/parse-value/parse-value.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type IntegerCheck } from './integer.ts';

export type IntegerErrorMap = ErrorMap<
  'invalid_type' | 'too_small' | 'too_big'
>;

export interface IntegerDef extends CheckDef<number, number, IntegerErrorMap> {
  readonly type: 'integer';
}

export function integerDef(
  error: ErrorHandlerParameter<IntegerErrorMap>,
): IntegerDef {
  return {
    kind: 'check',
    type: 'integer',
    errorMap: errorParamToErrorMap(error),

    _process,
  };
}

const _process: IntegerCheck['_process'] = function* (context) {
  const parsed = parseValue(context.value);
  if (parsed.type !== ValueType.number || parsed.isInteger !== true) {
    yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.integer,
      received: parsed.type,
      message: `Expected an ${ValueType.integer}.`,
    });
  }

  if (context.value < Number.MIN_SAFE_INTEGER) {
    yield* processIssue(this.errorMap, {
      code: 'too_small',
      path: context.path,
      input: context.value,
      expected: Number.MIN_SAFE_INTEGER,
      received: context.value,
      message: `Cannot be less than ${Number.MIN_SAFE_INTEGER}.`,
    });
  }

  if (context.value > Number.MAX_SAFE_INTEGER) {
    yield* processIssue(this.errorMap, {
      code: 'too_big',
      path: context.path,
      input: context.value,
      expected: Number.MAX_SAFE_INTEGER,
      received: context.value,
      message: `Cannot be greater than ${Number.MAX_SAFE_INTEGER}.`,
    });
  }
};
