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
import { type LiteralSchema } from './literal.ts';
import { type InferLiteralValue, type LiteralValues } from './types.ts';

export type LiteralErrorMap = ErrorMap<'invalid_type' | 'invalid_value'>;

export interface LiteralDef<TValues extends LiteralValues> extends SchemaDef<
  InferLiteralValue<TValues>,
  InferLiteralValue<TValues>,
  LiteralErrorMap
> {
  readonly type: 'literal';

  readonly values: ReadonlySet<InferLiteralValue<TValues>>;
}

export function literalDef<const TValues extends LiteralValues>(
  value: TValues,
  error: ErrorHandlerParameter<LiteralErrorMap>,
): LiteralDef<TValues> {
  return {
    kind: 'schema',
    type: 'literal',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    values: new Set(Array.isArray(value) ? value : [value]),

    _process,
  };
}

const _process: LiteralSchema['_process'] = function* (context) {
  const parsed = parseValue(context.value);
  if (parsed.type !== ValueType.string) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: parsed.value,
      expected: ValueType.string,
      received: parsed.type,
      message: `Expected a ${ValueType.string}.`,
    });
  }

  if (!this.values.has(parsed.value)) {
    const valuesArray = Array.from(this.values.values());
    return yield* processIssue(this.errorMap, {
      code: 'invalid_value',
      path: context.path,
      input: parsed.value,
      values: valuesArray,
      message: `Expected one of the options: ${valuesArray.map((value) => (typeof value === 'string' ? `"${value}"` : String(value))).join(' | ')}`,
    });
  }

  return yield* processChecks(this, context);
};
