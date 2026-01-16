import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { NEVER } from '../../internal/constants/constants.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processGenerator } from '../../internal/process/process-generator.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import {
  getValueType,
  ValueType,
} from '../../internal/value-type/value-type.ts';
import { type Schema, type SchemaDef } from '../schema/schema.ts';
import { type TupleSchema } from './tuple.ts';
import { type TupleInput, type TupleOutput, type TupleParts } from './types.ts';

export type TupleErrorMap = ErrorMap<
  'invalid_type' | 'invalid_value' | 'too_small'
>;

export interface TupleDef<
  TParts extends TupleParts,
  TRest extends Schema | undefined,
> extends SchemaDef<
  TupleInput<TParts, TRest>,
  TupleOutput<TParts, TRest>,
  TupleErrorMap
> {
  readonly type: 'tuple';

  readonly parts: TParts;
  readonly rest?: TRest | undefined;
}

export function tupleDef<
  const TParts extends TupleParts,
  const TRest extends Schema | undefined,
>(
  parts: TParts,
  rest: TRest | undefined,
  error: ErrorHandlerParameter<TupleErrorMap>,
): TupleDef<TParts, TRest> {
  return {
    kind: 'schema',
    type: 'tuple',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    parts,
    rest,

    _process,
  };
}

const _process: TupleSchema['_process'] = function* (context) {
  if (!Array.isArray(context.value)) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.array,
      received: getValueType(context.value),
      message: `Expected an ${ValueType.array}.`,
    });
  }

  if (!this.rest && context.value.length !== this.parts.length) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_value',
      path: [...context.path, 'length'],
      expected: this.parts.length,
      received: context.value.length,
      input: context.value,
      message: `Expected ${this.parts.length} items.`,
    });
  } else if (this.rest && context.value.length < this.parts.length) {
    return yield* processIssue(this.errorMap, {
      code: 'too_small',
      path: [...context.path, 'length'],
      expected: this.parts.length,
      received: context.value.length,
      input: context.value,
      message: `Expected at least ${this.parts.length} items.`,
    });
  }

  const newData: unknown[] = [];

  for (let index = 0; index < context.value.length; index++) {
    const part = this.parts[index] ?? this.rest;
    if (!part) {
      // Pass length checks so this means rest value is missing
      throw new Error('Tuple expected a rest value but none was provided.');
    }

    const partResult = yield* processGenerator(
      part._process({
        ...context,
        value: context.value[index],
        path: [...context.path, index],
      }),
    );

    if (partResult.success) newData[index] = partResult.data;
    else if (partResult.abort) {
      return NEVER;
    }
  }

  return yield* processChecks(this, {
    ...context,
    value: newData,
  });
};
