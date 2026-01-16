import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type Schema } from '../../schemas/schema/schema.ts';
import { safeEncode } from '../safe-encode/safe-encode.ts';

export type EncodeMethod = <const TSchema extends Schema>(
  this: TSchema,
  output: RawOutput<TSchema>,
) => RawInput<TSchema>;

export const encode: EncodeMethod = function (output) {
  const result = safeEncode.call(this, output);
  if (!result.success) throw new Error('Encoding failed.');
  return result.data;
};
