import { type ErrorHandlerParameter } from '../../error/error.ts';
import {
  createSchema,
  type DefineSchema,
  type Schema,
} from '../schema/schema.ts';
import { type TupleDef, tupleDef, type TupleErrorMap } from './def.ts';
import { type TupleParts } from './types.ts';

export interface TupleSchema<
  TParts extends TupleParts = TupleParts,
  TRest extends Schema | undefined = Schema | undefined,
> extends DefineSchema<TupleDef<TParts, TRest>> {
  kind: 'schema';
}

export function tuple<
  const TParts extends TupleParts,
  const TRest extends Schema | undefined = undefined,
>(
  parts: TParts,
  rest?: TRest,
  error?: ErrorHandlerParameter<TupleErrorMap>,
): TupleSchema<TParts, TRest> {
  return createSchema(tupleDef(parts, rest, error ?? {}));
}
