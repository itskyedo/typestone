import { type RawInput, type RawOutput } from '../../def/def.ts';
import { processSchema } from '../../internal/process/process-schema.ts';
import {
  type ParseResult,
  type ProcessOptions,
} from '../../internal/process/types.ts';
import { type Schema } from '../../schemas/schema/schema.ts';

export type SafeEncodeMethod = <const TSchema extends Schema>(
  this: TSchema,
  output: RawOutput<TSchema>,
  options?: ProcessOptions,
) => ParseResult<RawInput<TSchema>>;

export const safeEncode: SafeEncodeMethod = function (output, options) {
  return processSchema(this, {
    ...options,
    mode: 'encode',
    value: output,
    path: [],
  });
};
