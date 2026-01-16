import {
  createSchema,
  type DefineSchema,
  type Schema,
} from '../schema/schema.ts';
import { type CodecDef, codecDef } from './def.ts';
import { type CodecContract } from './types.ts';

export interface CodecSchema<
  TIn extends Schema = Schema,
  TOut extends Schema = Schema,
> extends DefineSchema<CodecDef<TIn, TOut>> {
  kind: 'schema';
}

export function codec<const TIn extends Schema, const TOut extends Schema>(
  contract: CodecContract<TIn, TOut>,
): CodecSchema<TIn, TOut> {
  return createSchema(codecDef(contract));
}
