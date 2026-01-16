import { type ErrorHandlerParameter } from '../../error/error.ts';
import { type ArraySchema } from '../../schemas/array/array.ts';
import { arrayDef, type ArrayErrorMap } from '../../schemas/array/def.ts';
import {
  type CreateSchemaFunction,
  type Schema,
} from '../../schemas/schema/schema.ts';

export type ArrayMethod = <const TSchema extends Schema>(
  this: TSchema,
  error?: ErrorHandlerParameter<ArrayErrorMap>,
) => ArraySchema<TSchema>;

export const attachArray: (attach: CreateSchemaFunction) => ArrayMethod = (
  attach,
) =>
  function (error) {
    return attach(arrayDef(this, error ?? {}));
  };
