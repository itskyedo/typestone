import { type RawOutput } from '../../def/def.ts';
import { type Schema } from '../schema/schema.ts';

export type NullableDefaultValue<TSchema extends Schema> =
  RawOutput<TSchema> | null;
