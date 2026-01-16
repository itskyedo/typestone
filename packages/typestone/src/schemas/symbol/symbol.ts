import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type SymbolDef, symbolDef, type SymbolErrorMap } from './def.ts';

export interface SymbolSchema extends DefineSchema<SymbolDef> {
  kind: 'schema';
}

export function symbol(
  error?: ErrorHandlerParameter<SymbolErrorMap>,
): SymbolSchema {
  return createSchema(symbolDef(error ?? {}));
}
