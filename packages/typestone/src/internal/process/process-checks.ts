import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type Schema } from '../../schemas/schema/schema.ts';
import { NEVER } from '../constants/constants.ts';
import { processGenerator } from './process-generator.ts';
import {
  type ModeSwitch,
  type ProcessContext,
  type ProcessGenerator,
  type ProcessMode,
  type ProcessReturn,
} from './types.ts';

export function* processChecks<
  const TSchema extends Schema,
  const TMode extends ProcessMode,
>(
  schema: TSchema,
  context: ProcessContext<unknown, TMode>,
): ProcessGenerator<ModeSwitch<TMode, RawInput<TSchema>, RawOutput<TSchema>>> {
  let success = true;

  for (const check of schema.checks) {
    const result = yield* processGenerator(check._process(context));

    if (!result.success) {
      success = false;
      if (result.abort) {
        return {
          success: false,
          abort: true,
        };
      }
    }
  }

  if (success) {
    return context.value as ProcessReturn<
      TMode,
      RawInput<TSchema>,
      RawOutput<TSchema>
    >;
  } else {
    return NEVER;
  }
}
