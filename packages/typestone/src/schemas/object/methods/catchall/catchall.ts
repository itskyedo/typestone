import { createSchema, type Schema } from '../../../schema/schema.ts';
import { type ObjectSchema } from '../../object.ts';
import { type ObjectShape } from '../../types.ts';
import { type CatchallObject } from './types.ts';

export type CatchallMethod<TShape extends ObjectShape = ObjectShape> = <
  const TSchema extends ObjectSchema<TShape>,
  const TCatchSchema extends Schema,
>(
  this: TSchema,
  schema: TCatchSchema,
) => CatchallObject<TSchema, TCatchSchema>;

export const catchall: CatchallMethod = function (schema) {
  return createSchema({
    ...this,
    checks: [...this.checks],
    catchallSchema: schema,
  });
};
