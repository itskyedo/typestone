import { type RawOutput } from '../../def/def.ts';
import { type Schema } from '../schema/schema.ts';

export type OptionalDefaultValue<TSchema extends Schema> =
  | RawOutput<TSchema>
  | undefined;
