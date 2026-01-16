import { type RawOutput } from '../../def/def.ts';
import { processSchema } from '../../internal/process/process-schema.ts';
import { type ParseResult } from '../../internal/process/types.ts';
import { type Schema } from '../../schemas/schema/schema.ts';

export type SafeParseMethod = <const TSchema extends Schema>(
  this: TSchema,
  value: unknown,
) => ParseResult<RawOutput<TSchema>>;

export const safeParse: SafeParseMethod = function (value) {
  return processSchema(this, {
    mode: 'decode',
    value,
    path: [],
  });
};
