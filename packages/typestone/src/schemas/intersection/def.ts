import { type ErrorMap } from '../../error/error.ts';
import { NEVER } from '../../internal/constants/constants.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processGenerator } from '../../internal/process/process-generator.ts';
import { type SchemaDef } from '../schema/schema.ts';
import { type IntersectionSchema } from './intersection.ts';
import {
  type IntersectionInput,
  type IntersectionOptions,
  type IntersectionOutput,
} from './types.ts';

export type IntersectionErrorMap = ErrorMap<never>;

export interface IntersectionDef<
  TOptions extends IntersectionOptions,
> extends SchemaDef<
  IntersectionInput<TOptions>,
  IntersectionOutput<TOptions>,
  IntersectionErrorMap
> {
  readonly type: 'intersection';

  readonly options: TOptions;
}

export function intersectionDef<const TOptions extends IntersectionOptions>(
  options: TOptions,
): IntersectionDef<TOptions> {
  return {
    kind: 'schema',
    type: 'intersection',
    checks: [],
    errorMap: {},

    options,

    _process,
  };
}

const _process: IntersectionSchema['_process'] = function* (context) {
  let newData: unknown = context.value;

  for (const option of this.options) {
    const result = yield* processGenerator(option._process(context));
    if (result.success) {
      const left: unknown = context.value;
      const right: unknown = result.data;

      if (Array.isArray(right)) {
        newData = Array.isArray(left)
          ? (newData = Array.from({
              length: Math.max(left.length, right.length),
            }).map(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              (_, index) => right[index] ?? left[index],
            ))
          : right;
      } else if (typeof right === 'object') {
        newData = typeof left === 'object' ? { ...left, ...right } : right;
      } else {
        newData = right;
      }
    } else if (result.abort) {
      return NEVER;
    }
  }

  return yield* processChecks(this, {
    ...context,
    value: newData,
  });
};
