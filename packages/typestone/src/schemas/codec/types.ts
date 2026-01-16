import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type Context } from '../../internal/process/types.ts';
import { type Schema } from '../schema/schema.ts';

export type CodecInput<TSchema extends Schema> = RawInput<TSchema>;

export type CodecOutput<TSchema extends Schema> = RawOutput<TSchema>;

export interface CodecContract<TIn extends Schema, TOut extends Schema> {
  in: TIn;
  out: TOut;
  encode: (data: RawInput<TOut>, context: Context) => RawOutput<TIn>;
  decode: (data: RawOutput<TIn>, context: Context) => RawInput<TOut>;
}
