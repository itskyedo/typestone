import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type Schema } from '../../schemas/schema/schema.ts';
import { safeDecode } from '../safe-decode/safe-decode.ts';

export type DecodeMethod = <const TSchema extends Schema>(
  this: TSchema,
  input: RawInput<TSchema>,
) => RawOutput<TSchema>;

export const decode: DecodeMethod = function (input) {
  const result = safeDecode.call(this, input);
  if (!result.success) throw new Error('Decoding failed.');
  return result.data;
};
