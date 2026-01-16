import { type ErrorHandlerParameter } from '../../error/error.ts';
import {
  createSchema,
  type DefineSchema,
  type Schema,
} from '../schema/schema.ts';
import { type ArrayDef, arrayDef, type ArrayErrorMap } from './def.ts';

export interface ArraySchema<
  TSchema extends Schema = Schema,
> extends DefineSchema<ArrayDef<TSchema>> {
  kind: 'schema';
}

export function array<const TSchema extends Schema>(
  schema: TSchema,
  error?: ErrorHandlerParameter<ArrayErrorMap>,
): ArraySchema<TSchema> {
  return createSchema(arrayDef(schema, error ?? {}));
}
