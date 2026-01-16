import { type RawOutput } from '../../def/def.ts';
import { type Schema } from '../../schemas/schema/schema.ts';
import { safeDecode } from '../safe-decode/safe-decode.ts';

export type ParseMethod = <const TSchema extends Schema>(
  this: TSchema,
  value: unknown,
) => RawOutput<TSchema>;

export const parse: ParseMethod = function (value) {
  const result = safeDecode.call(this, value);
  if (!result.success) throw new Error('Parsing failed.');
  return result.data;
};
