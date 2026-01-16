import { type RawInput, type RawOutput } from '../../def/def.ts';
import { processSchema } from '../../internal/process/process-schema.ts';
import { type ParseResult } from '../../internal/process/types.ts';
import { type Schema } from '../../schemas/schema/schema.ts';

export type SafeDecodeMethod = <const TSchema extends Schema>(
  this: TSchema,
  input: RawInput<TSchema>,
) => ParseResult<RawOutput<TSchema>>;

export const safeDecode: SafeDecodeMethod = function (input) {
  return processSchema(this, {
    mode: 'decode',
    value: input,
    path: [],
  });
};
