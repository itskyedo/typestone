import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type ErrorMap } from '../../error/error.ts';
import { type MaybeWrapped } from '../../functions/wrap/wrap.ts';
import { NEVER } from '../../internal/constants/constants.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processGenerator } from '../../internal/process/process-generator.ts';
import { type Schema, type SchemaDef } from '../schema/schema.ts';
import { type OptionalSchema } from './optional.ts';
import { type OptionalDefaultValue } from './types.ts';

export type OptionalErrorMap = ErrorMap<never>;

export interface OptionalDef<
  TSchema extends Schema,
  TDefaultValue extends OptionalDefaultValue<TSchema>,
> extends SchemaDef<
  RawInput<TSchema> | undefined,
  RawOutput<TSchema> | TDefaultValue,
  OptionalErrorMap
> {
  readonly type: 'optional';

  readonly inner: TSchema;

  /**
   * @internal
   */
  readonly _defaultValue?: MaybeWrapped<TDefaultValue> | undefined;
}

export function optionalDef<
  const TSchema extends Schema,
  const TDefaultValue extends OptionalDefaultValue<TSchema>,
>(
  schema: TSchema,
  defaultValue: MaybeWrapped<TDefaultValue> | undefined,
): OptionalDef<TSchema, TDefaultValue> {
  return {
    kind: 'schema',
    type: 'optional',
    checks: [],
    errorMap: {},

    inner: schema,

    _defaultValue: defaultValue,

    _process,
  };
}

const _process: OptionalSchema['_process'] = function* (context) {
  let newData: unknown;

  if (typeof context.value === 'undefined') {
    newData = undefined;
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
