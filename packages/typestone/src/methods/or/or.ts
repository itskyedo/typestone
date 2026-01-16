import { type ErrorHandlerParameter } from '../../error/error.ts';
import {
  type CreateSchemaFunction,
  type Schema,
} from '../../schemas/schema/schema.ts';
import { unionDef, type UnionErrorMap } from '../../schemas/union/def.ts';
import { type UnionSchema } from '../../schemas/union/union.ts';

export type OrMethod = <
  const TSchema extends Schema,
  const TOptionSchema extends Schema,
>(
  this: TSchema,
  option: TOptionSchema,
  error?: ErrorHandlerParameter<UnionErrorMap>,
) => UnionSchema<[TSchema, TOptionSchema]>;

export const attachOr: (attach: CreateSchemaFunction) => OrMethod = (attach) =>
  function (option, error) {
    return attach(unionDef([this, option], error ?? {}));
  };
