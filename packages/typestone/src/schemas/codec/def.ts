import { type ErrorMap } from '../../error/error.ts';
import { NEVER } from '../../internal/constants/constants.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processContext } from '../../internal/process/process-context.ts';
import { processGenerator } from '../../internal/process/process-generator.ts';
import { type Context } from '../../internal/process/types.ts';
import { type Schema, type SchemaDef } from '../schema/schema.ts';
import { type CodecSchema } from './codec.ts';
import {
  type CodecContract,
  type CodecInput,
  type CodecOutput,
} from './types.ts';

export type CodecErrorMap = ErrorMap<never>;

export interface CodecDef<
  TIn extends Schema,
  TOut extends Schema,
> extends SchemaDef<CodecInput<TIn>, CodecOutput<TOut>, CodecErrorMap> {
  readonly type: 'codec';

  readonly contract: CodecContract<TIn, TOut>;
  readonly in: TIn;
  readonly out: TOut;
}

export function codecDef<const TIn extends Schema, const TOut extends Schema>(
  contract: CodecContract<TIn, TOut>,
): CodecDef<TIn, TOut> {
  return {
    kind: 'schema',
    type: 'codec',
    checks: [],
    errorMap: {},

    contract,
    in: contract.in,
    out: contract.out,

    _process,
  };
}

const _process: CodecSchema['_process'] = function* (context) {
  const inverseSchema: Schema = context.mode === 'encode' ? this.out : this.in;
  const preResult = yield* processGenerator(inverseSchema._process(context));
  if (!preResult.success) {
    return NEVER;
  }

  const transformContext: Context = { path: [...context.path], issues: [] };
  const transformed: unknown =
    context.mode === 'encode'
      ? this.contract.encode(context.value, transformContext)
      : this.contract.decode(context.value, transformContext);
  const transformResult = yield* processContext(transformContext);
  if (!transformResult) {
    return NEVER;
  }

  const targetSchema: Schema = context.mode === 'encode' ? this.in : this.out;
  const postResult = yield* processGenerator(
    targetSchema._process({
      ...context,
      value: transformed,
    }),
  );
  if (!postResult.success) {
    return NEVER;
  }

  return yield* processChecks(this, {
    ...context,
    value: postResult.data,
  });
};
