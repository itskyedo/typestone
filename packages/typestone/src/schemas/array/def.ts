import { type RawInput, type RawOutput } from '../../def/def.ts';
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
import { type ArraySchema } from './array.ts';

export type ArrayErrorMap = ErrorMap<'invalid_type'>;

export interface ArrayDef<TSchema extends Schema> extends SchemaDef<
  RawInput<TSchema>[],
  RawOutput<TSchema>[],
  ArrayErrorMap
> {
  readonly type: 'array';

  readonly inner: TSchema;
}

export function arrayDef<const TSchema extends Schema>(
  schema: TSchema,
  error: ErrorHandlerParameter<ArrayErrorMap>,
): ArrayDef<TSchema> {
  return {
    kind: 'schema',
    type: 'array',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    inner: schema,

    _process,
  };
}

const _process: ArraySchema['_process'] = function* (context) {
  const parsed = parseValue(context.value);
  if (parsed.type !== ValueType.array) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.array,
      received: parsed.type,
      message: `Expected an ${ValueType.array}.`,
    });
  }

  const newData: any[] = [];

  for (let i = 0; i < parsed.value.length; i++) {
    const item: unknown = parsed.value[i];
    const result = yield* processGenerator(
      this.inner._process({
        ...context,
        value: item,
        path: [...context.path, i],
      }),
    );

    if (result.success) {
      newData.push(result.data);
    } else {
      return NEVER;
    }
  }

  return yield* processChecks(this, {
    ...context,
    value: newData,
  });
};
