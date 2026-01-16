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
import { type EnumSchema } from './enum.ts';
import { type EnumMap, type EnumOptions } from './types.ts';
import { createEnumMap, getEnumOption } from './utils.ts';

export type EnumErrorMap = ErrorMap<'invalid_type' | 'invalid_value'>;

export interface EnumDef<TOptions extends EnumOptions> extends SchemaDef<
  TOptions[number],
  TOptions[number],
  EnumErrorMap
> {
  readonly type: 'enum';

  readonly options: TOptions;
  readonly enum: EnumMap<TOptions>;

  get(value: string): TOptions[number] | null;
}

export function enumDef<const TOptions extends EnumOptions>(
  options: TOptions,
  error: ErrorHandlerParameter<EnumErrorMap>,
): EnumDef<TOptions> {
  return {
    kind: 'schema',
    type: 'enum',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    options,
    enum: createEnumMap(options),

    get: getEnumOption,

    _process,
  };
}

const _process: EnumSchema['_process'] = function* (context) {
  if (typeof context.value !== 'string') {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.string,
      received: getValueType(context.value),
      message: `Expected a ${ValueType.string}.`,
    });
  }

  if (!this.get(context.value)) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_value',
      path: context.path,
      input: context.value,
      values: this.options,
      message: `Expected one of the options: ${this.options.map((value) => (typeof value === 'string' ? `"${value}"` : String(value))).join(' | ')}`,
    });
  }

  return yield* processChecks(this, context);
};
