import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type Schema } from '../schema/schema.ts';

export type UnionOptions = [Schema, ...Schema[]];

export type UnionInput<TOptions extends UnionOptions> = RawInput<
  TOptions[number]
>;

export type UnionOutput<TOptions extends UnionOptions> = RawOutput<
  TOptions[number]
>;
