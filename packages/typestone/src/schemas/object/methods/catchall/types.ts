import { type RawInput, type RawOutput } from '../../../../def/def.ts';
import {
  type ReplaceSchemaTypes,
  type Schema,
} from '../../../schema/schema.ts';
import { type ObjectSchema } from '../../object.ts';

export type CatchallObject<
  TSchema extends ObjectSchema<any>,
  TCatchSchema extends Schema,
> = ReplaceSchemaTypes<
  TSchema & { catchallSchema: TCatchSchema },
  RawInput<TSchema> & Record<string, RawInput<TCatchSchema>>,
  RawOutput<TSchema> & Record<string, RawOutput<TCatchSchema>>
> & {};
