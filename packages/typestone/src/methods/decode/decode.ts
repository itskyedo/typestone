import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type ProcessOptions } from '../../internal/process/types.ts';
import { type Schema } from '../../schemas/schema/schema.ts';
import { safeDecode } from '../safe-decode/safe-decode.ts';

export type DecodeMethod = <const TSchema extends Schema>(
  this: TSchema,
  input: RawInput<TSchema>,
  options?: ProcessOptions,
) => RawOutput<TSchema>;

export const decode: DecodeMethod = function (input, options) {
  const result = safeDecode.call(this, input, options);
  if (!result.success) throw new Error('Decoding failed.');
  return result.data;
};
