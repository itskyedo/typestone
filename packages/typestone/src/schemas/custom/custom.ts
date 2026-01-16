import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type CustomDef, customDef, type CustomErrorMap } from './def.ts';
import { type CustomFunction } from './types.ts';

export interface CustomSchema<TType = unknown> extends DefineSchema<
  CustomDef<TType>
> {
  kind: 'schema';
}

export function custom<const TType>(
  fn: CustomFunction<TType>,
  error?: ErrorHandlerParameter<CustomErrorMap>,
): CustomSchema<TType> {
  return createSchema(customDef(fn, error ?? {}));
}
