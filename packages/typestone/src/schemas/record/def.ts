import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { NEVER } from '../../internal/constants/constants.ts';
import {
  parseValue,
  ValueType,
} from '../../internal/parse-value/parse-value.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processGenerator } from '../../internal/process/process-generator.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type Schema, type SchemaDef } from '../schema/schema.ts';
import { type RecordSchema } from './record.ts';
import {
  type RecordInput,
  type RecordKey,
  type RecordOutput,
} from './types.ts';

export type RecordErrorMap = ErrorMap<'invalid_type'>;

export interface RecordDef<
  TKey extends RecordKey,
  TValue extends Schema,
> extends SchemaDef<
  RecordInput<TKey, TValue>,
  RecordOutput<TKey, TValue>,
  RecordErrorMap
> {
  readonly type: 'record';

  readonly options: readonly [TKey, TValue];
}

export function recordDef<
  const TKey extends RecordKey,
  const TValue extends Schema,
>(
  keySchema: TKey,
  valueSchema: TValue,
  error: ErrorHandlerParameter<RecordErrorMap>,
): RecordDef<TKey, TValue> {
  return {
    kind: 'schema',
    type: 'record',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    options: [keySchema, valueSchema],

    _process,
  };
}

const _process: RecordSchema['_process'] = function* (context) {
  const parsed = parseValue(context.value);
  if (parsed.type !== ValueType.object) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: parsed.value,
      expected: ValueType.object,
      received: parsed.type,
      message: `Expected an ${ValueType.object}.`,
    });
  }

  const newData: Record<any, unknown> = {};

  for (const [key, value] of Object.entries(parsed.value)) {
    const keyResult = yield* processGenerator(
      this.options[0]._process({
        ...context,
        value: key,
        path: [...context.path, key],
      }),
    );

    const valueResult = yield* processGenerator(
      this.options[1]._process({
        ...context,
        value,
        path: [...context.path, key],
      }),
    );

    if (keyResult.success && valueResult.success) {
      newData[keyResult.data] = valueResult.data;
    } else if (keyResult.abort || valueResult.abort) {
      return NEVER;
    }
  }

  return yield* processChecks(this, {
    ...context,
    value: newData,
  });
};
