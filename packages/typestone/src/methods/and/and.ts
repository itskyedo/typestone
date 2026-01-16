import { intersectionDef } from '../../schemas/intersection/def.ts';
import { type IntersectionSchema } from '../../schemas/intersection/intersection.ts';
import {
  type CreateSchemaFunction,
  type Schema,
} from '../../schemas/schema/schema.ts';

export type AndMethod = <
  const TSchema extends Schema,
  const TOptionSchema extends Schema,
>(
  this: TSchema,
  option: TOptionSchema,
) => IntersectionSchema<[TSchema, TOptionSchema]>;

export const attachAnd: (attach: CreateSchemaFunction) => AndMethod = (
  attach,
) =>
  function (option) {
    return attach(intersectionDef([this, option]));
  };
