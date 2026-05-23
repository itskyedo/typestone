import { type RawOutput } from '../../def/def.ts';
import { type ProcessOptions } from '../../internal/process/types.ts';
import { type Schema } from '../../schemas/schema/schema.ts';
import { safeDecode } from '../safe-decode/safe-decode.ts';

export type ParseMethod = <const TSchema extends Schema>(
  this: TSchema,
  value: unknown,
  options?: ProcessOptions,
) => RawOutput<TSchema>;

export const parse: ParseMethod = function (value, options) {
  const result = safeDecode.call(this, value, options);
  if (!result.success) throw new Error('Parsing failed.');
  return result.data;
};
