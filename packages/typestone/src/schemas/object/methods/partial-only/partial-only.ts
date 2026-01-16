import { isSchema } from '../../../../functions/def/def.ts';
import { declareTypes } from '../../../../internal/declare-types/declare-types.ts';
import { optionalDef } from '../../../optional/def.ts';
import { type OptionalSchema } from '../../../optional/optional.ts';
import { createSchema } from '../../../schema/schema.ts';
import { objectDef } from '../../def.ts';
import { type ObjectSchema } from '../../object.ts';
import { type ObjectShape } from '../../types.ts';
import { type PartialOnlyObject, type PartialOnlyShape } from './types.ts';

export type PartialOnlyMethod<TShape extends ObjectShape = ObjectShape> = <
  const TSchema extends ObjectSchema<TShape>,
  const TProps extends Partial<Record<keyof TSchema['shape'], true>>,
>(
  this: TSchema,
  props: TProps,
) => PartialOnlyObject<TSchema, TProps>;

export const partialOnly: PartialOnlyMethod = function (props) {
  const shape: PartialOnlyShape<
    ObjectShape,
    Partial<Record<keyof ObjectShape, true>>
  > = {};
  for (const [key, schema] of Object.entries(this.shape)) {
    shape[key] =
      props[key] === true && !isSchema<OptionalSchema>(schema, 'optional')
        ? createSchema(optionalDef(schema, undefined))
        : schema;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return createSchema({
    ...declareTypes<any, any>(),
    ...this,
    ...objectDef(shape, this.behavior, this.errorMap),
    checks: [...this.checks],
  } satisfies PartialOnlyObject<
    ObjectSchema,
    Partial<Record<keyof ObjectShape, true>>
  > as any);
};
