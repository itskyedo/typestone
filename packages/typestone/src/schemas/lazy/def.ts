import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type ErrorMap } from '../../error/error.ts';
import { NEVER } from '../../internal/constants/constants.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processGenerator } from '../../internal/process/process-generator.ts';
import { type Schema, type SchemaDef } from '../schema/schema.ts';
import { type LazySchema } from './lazy.ts';

export type LazyErrorMap = ErrorMap<never>;

export interface LazyDef<TSchema extends Schema> extends SchemaDef<
  RawInput<TSchema>,
  RawOutput<TSchema>,
  LazyErrorMap
> {
  readonly type: 'lazy';

  readonly inner: () => TSchema;
}

export function lazyDef<const TSchema extends Schema>(
  fn: () => TSchema,
): LazyDef<TSchema> {
  return {
    kind: 'schema',
    type: 'lazy',
    checks: [],
    errorMap: {},

    inner: fn,

    _process,
  };
}

const _process: LazySchema['_process'] = function* (context) {
  let newData: unknown;

  const result = yield* processGenerator(this.inner()._process(context));
  if (result.success) {
    newData = result.data;
  } else {
    return NEVER;
  }

  return yield* processChecks(this, {
    ...context,
    value: newData,
  });
};
