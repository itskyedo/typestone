import { isSchema } from '../../../../functions/def/def.ts';
import { declareTypes } from '../../../../internal/declare-types/declare-types.ts';
import { optionalDef } from '../../../optional/def.ts';
import { getDefault } from '../../../optional/methods/get-default/get-default.ts';
import { type OptionalSchema } from '../../../optional/optional.ts';
import { createSchema, type Schema } from '../../../schema/schema.ts';
import { objectDef } from '../../def.ts';
import { type ObjectSchema } from '../../object.ts';
import { type ObjectShape } from '../../types.ts';
import { type PartialAllObject, type PartialAllShape } from './types.ts';

export type PartialAllMethod<TShape extends ObjectShape = ObjectShape> = <
  const TSchema extends ObjectSchema<TShape>,
>(
  this: TSchema,
) => PartialAllObject<TSchema>;

export const partialAll: PartialAllMethod = function () {
  const shape: PartialAllShape<ObjectShape> = {};
  for (const [key, schema] of Object.entries(this.shape)) {
    shape[key] = isSchema<OptionalSchema<Schema, undefined>>(schema, 'optional')
      ? schema
      : createSchema({
          ...optionalDef(schema, undefined),
          getDefault,
        });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return createSchema({
    ...declareTypes<any, any>(),
    ...this,
    ...objectDef(shape, this.behavior, this.errorMap),
    checks: [...this.checks],
  } satisfies PartialAllObject<ObjectSchema> as any);
};
