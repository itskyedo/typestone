import { type RawOutput } from '../../def/def.ts';
import { type ErrorMap } from '../../error/error.ts';
import { NEVER } from '../../internal/constants/constants.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processGenerator } from '../../internal/process/process-generator.ts';
import { type Schema, type SchemaDef } from '../schema/schema.ts';
import { type PipeSchema } from './pipe.ts';

export type PipeErrorMap = ErrorMap<never>;

export interface PipeDef<
  TInput extends Schema,
  TOutput extends Schema<RawOutput<TInput>, unknown>,
> extends SchemaDef<RawOutput<TInput>, RawOutput<TOutput>, PipeErrorMap> {
  readonly type: 'pipe';

  readonly in: TInput;
  readonly out: Schema<RawOutput<TInput>, RawOutput<TOutput>>;
}

export function pipeDef<
  const TInput extends Schema,
  const TOutput extends Schema<RawOutput<TInput>, any>,
>(input: TInput, output: TOutput): PipeDef<TInput, TOutput> {
  return {
    kind: 'schema',
    type: 'pipe',
    checks: [],
    errorMap: {},

    in: input,
    out: output,

    _process,
  };
}

const _process: PipeSchema['_process'] = function* (context) {
  const inResult = yield* processGenerator(this.in._process(context));
  if (!inResult.success) {
    return NEVER;
  }

  const outResult = yield* processGenerator(
    this.out._process({
      ...context,
      value: inResult.data,
    }),
  );
  if (!outResult.success) {
    return NEVER;
  }

  return yield* processChecks(this, {
    ...context,
    value: outResult.data,
  });
};
