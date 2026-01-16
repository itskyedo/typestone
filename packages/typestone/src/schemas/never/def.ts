import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import {
  getValueType,
  ValueType,
} from '../../internal/value-type/value-type.ts';
import { type SchemaDef } from '../schema/schema.ts';
import { type NeverSchema } from './never.ts';

export type NeverErrorMap = ErrorMap<'invalid_type'>;

export interface NeverDef extends SchemaDef<never, never, NeverErrorMap> {
  readonly type: 'never';
}

export function neverDef(
  error: ErrorHandlerParameter<NeverErrorMap>,
): NeverDef {
  return {
    kind: 'schema',
    type: 'never',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    _process,
  };
}

const _process: NeverSchema['_process'] = function* (context) {
  return yield* processIssue(this.errorMap, {
    code: 'invalid_type',
    path: context.path,
    input: context.value,
    expected: ValueType.never,
    received: getValueType(context.value),
    message: `Expected ${ValueType.never}.`,
  });
};
