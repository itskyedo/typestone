import { type ErrorHandlerParameter } from '../../error/error.ts';
import {
  createSchema,
  type DefineSchema,
  type Schema,
} from '../schema/schema.ts';
import { type RecordDef, recordDef, type RecordErrorMap } from './def.ts';
import { type RecordKey } from './types.ts';

export interface RecordSchema<
  TKey extends RecordKey = RecordKey,
  TValue extends Schema = Schema,
> extends DefineSchema<RecordDef<TKey, TValue>> {
  kind: 'schema';
}

export function record<
  const TKey extends RecordKey,
  const TValue extends Schema,
>(
  keySchema: TKey,
  valueSchema: TValue,
  error?: ErrorHandlerParameter<RecordErrorMap>,
): RecordSchema<TKey, TValue> {
  return createSchema(recordDef(keySchema, valueSchema, error ?? {}));
}
