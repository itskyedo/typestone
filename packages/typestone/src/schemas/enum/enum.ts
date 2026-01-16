import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type EnumDef, enumDef, type EnumErrorMap } from './def.ts';
import { type EnumOptions } from './types.ts';

export interface EnumSchema<
  TOptions extends EnumOptions = EnumOptions,
> extends DefineSchema<EnumDef<TOptions>> {
  kind: 'schema';
}

function _enum<const TOptions extends EnumOptions>(
  options: TOptions,
  error?: ErrorHandlerParameter<EnumErrorMap>,
): EnumSchema<TOptions> {
  return createSchema(enumDef(options, error ?? {}));
}

export { _enum as enum };
