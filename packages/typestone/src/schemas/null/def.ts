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
import { type NullSchema } from './null.ts';

export type NullErrorMap = ErrorMap<'invalid_type'>;

export interface NullDef extends SchemaDef<null, null, NullErrorMap> {
  readonly type: 'null';
}

export function nullDef(error: ErrorHandlerParameter<NullErrorMap>): NullDef {
  return {
    kind: 'schema',
    type: 'null',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    _process,
  };
}

const _process: NullSchema['_process'] = function* (context) {
  if (context.value !== null) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.null,
      received: getValueType(context.value),
      message: `Expected ${ValueType.null}.`,
    });
  }

  return yield* processChecks(this, context);
};
