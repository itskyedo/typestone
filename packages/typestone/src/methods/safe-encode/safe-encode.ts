import { type RawInput, type RawOutput } from '../../def/def.ts';
import { processSchema } from '../../internal/process/process-schema.ts';
import { type ParseResult } from '../../internal/process/types.ts';
import { type Schema } from '../../schemas/schema/schema.ts';

export type SafeEncodeMethod = <const TSchema extends Schema>(
  this: TSchema,
  output: RawOutput<TSchema>,
) => ParseResult<RawInput<TSchema>>;

export const safeEncode: SafeEncodeMethod = function (output) {
  return processSchema(this, {
    mode: 'encode',
    value: output,
    path: [],
  });
};
