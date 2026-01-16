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
import { type SymbolSchema } from './symbol.ts';

export type SymbolErrorMap = ErrorMap<'invalid_type'>;

export interface SymbolDef extends SchemaDef<symbol, symbol, SymbolErrorMap> {
  readonly type: 'symbol';
}

export function symbolDef(
  error: ErrorHandlerParameter<SymbolErrorMap>,
): SymbolDef {
  return {
    kind: 'schema',
    type: 'symbol',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    _process,
  };
}

const _process: SymbolSchema['_process'] = function* (context) {
  if (typeof context.value !== 'symbol') {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.symbol,
      received: getValueType(context.value),
      message: `Expected a ${ValueType.symbol}.`,
    });
  }

  return yield* processChecks(this, context);
};
