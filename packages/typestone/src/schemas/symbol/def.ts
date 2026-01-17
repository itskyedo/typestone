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
  const parsed = parseValue(context.value);
  if (parsed.type !== ValueType.symbol) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.symbol,
      received: parsed.type,
      message: `Expected a ${ValueType.symbol}.`,
    });
  }

  return yield* processChecks(this, context);
};
