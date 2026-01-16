import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type UnionDef, unionDef, type UnionErrorMap } from './def.ts';
import { type UnionOptions } from './types.ts';

export interface UnionSchema<
  TOptions extends UnionOptions = UnionOptions,
> extends DefineSchema<UnionDef<TOptions>> {
  kind: 'schema';
}

export function union<const TOptions extends UnionOptions>(
  options: TOptions,
  error?: ErrorHandlerParameter<UnionErrorMap>,
): UnionSchema<TOptions> {
  return createSchema(unionDef(options, error ?? {}));
}
