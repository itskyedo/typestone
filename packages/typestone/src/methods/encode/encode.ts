import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type ProcessOptions } from '../../internal/process/types.ts';
import { type Schema } from '../../schemas/schema/schema.ts';
import { safeEncode } from '../safe-encode/safe-encode.ts';

export type EncodeMethod = <const TSchema extends Schema>(
  this: TSchema,
  output: RawOutput<TSchema>,
  options?: ProcessOptions,
) => RawInput<TSchema>;

export const encode: EncodeMethod = function (output, options) {
  const result = safeEncode.call(this, output, options);
  if (!result.success) throw new Error('Encoding failed.');
  return result.data;
};
