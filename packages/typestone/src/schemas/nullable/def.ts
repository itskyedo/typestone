import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type ErrorMap } from '../../error/error.ts';
import { type MaybeWrapped } from '../../functions/wrap/wrap.ts';
import { NEVER } from '../../internal/constants/constants.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processGenerator } from '../../internal/process/process-generator.ts';
import { type Schema, type SchemaDef } from '../schema/schema.ts';
import { type NullableSchema } from './nullable.ts';
import { type NullableDefaultValue } from './types.ts';

export type NullableErrorMap = ErrorMap<never>;

export interface NullableDef<
  TSchema extends Schema,
  TDefaultValue extends NullableDefaultValue<TSchema>,
> extends SchemaDef<
  RawInput<TSchema> | null,
  RawOutput<TSchema> | TDefaultValue,
  NullableErrorMap
> {
  readonly type: 'nullable';

  readonly inner: TSchema;

  /**
   * @internal
   */
  readonly _defaultValue?: MaybeWrapped<TDefaultValue> | undefined;
}

export function nullableDef<
  const TSchema extends Schema,
  const TDefaultValue extends NullableDefaultValue<TSchema>,
>(
  schema: TSchema,
  defaultValue: MaybeWrapped<TDefaultValue> | undefined,
): NullableDef<TSchema, TDefaultValue> {
  return {
    kind: 'schema',
    type: 'nullable',
    checks: [],
    errorMap: {},

    inner: schema,

    _defaultValue: defaultValue,

    _process,
  };
}

const _process: NullableSchema['_process'] = function* (context) {
  let newData: unknown;

  if (context.value === null) {
    newData = null;
  } else {
    const innerResult = yield* processGenerator(this.inner._process(context));
    if (innerResult.success) {
      newData = innerResult.data;
    } else {
      return NEVER;
    }
  }

  if (typeof newData === 'undefined') {
    newData = this.getDefault();
  }

  return yield* processChecks(this, {
    ...context,
    value: newData,
  });
};
