import { type RawInput, type RawOutput } from '../../def/def.ts';
import { processSchema } from '../../internal/process/process-schema.ts';
import {
  type ParseResult,
  type ProcessOptions,
} from '../../internal/process/types.ts';
import { type Schema } from '../../schemas/schema/schema.ts';

export type SafeDecodeMethod = <const TSchema extends Schema>(
  this: TSchema,
  input: RawInput<TSchema>,
  options?: ProcessOptions,
) => ParseResult<RawOutput<TSchema>>;

export const safeDecode: SafeDecodeMethod = function (input, options) {
  return processSchema(this, {
    ...options,
    mode: 'decode',
    value: input,
    path: [],
  });
};
