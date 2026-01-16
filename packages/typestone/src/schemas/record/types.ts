import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type Schema } from '../schema/schema.ts';

export type RecordKey = Schema<string | number, string | number>;

export type RecordInput<TKey extends RecordKey, TValue extends Schema> = Record<
  RawInput<TKey>,
  RawInput<TValue>
>;

export type RecordOutput<
  TKey extends RecordKey,
  TValue extends Schema,
> = Record<RawOutput<TKey>, RawOutput<TValue>>;
