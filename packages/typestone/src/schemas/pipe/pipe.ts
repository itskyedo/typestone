import { type RawOutput } from '../../def/def.ts';
import { type DefineSchema, type Schema } from '../schema/schema.ts';
import { type PipeDef } from './def.ts';

export interface PipeSchema<
  TInput extends Schema = Schema,
  TOutput extends Schema<RawOutput<TInput>, unknown> = Schema<
    RawOutput<TInput>,
    unknown
  >,
> extends DefineSchema<PipeDef<TInput, TOutput>> {
  kind: 'schema';
}
