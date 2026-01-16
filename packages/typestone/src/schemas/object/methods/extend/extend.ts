import { declareTypes } from '../../../../internal/declare-types/declare-types.ts';
import { createSchema } from '../../../schema/schema.ts';
import { objectDef } from '../../def.ts';
import { type ObjectSchema } from '../../object.ts';
import { type ObjectShape } from '../../types.ts';
import { type ExtendObject, type ExtendProps } from './types.ts';

export type ExtendMethod<TShape extends ObjectShape = ObjectShape> = <
  const TSchema extends ObjectSchema<TShape>,
  const TProps extends ObjectShape,
>(
  this: TSchema,
  props: ExtendProps<TProps>,
) => ExtendObject<TSchema, TProps>;

export const extend: ExtendMethod = function (props) {
  if (this.checks.length > 0) {
    throw new Error(
      'Cannot extend an object that contains refinements. Use `.safeExtends()` instead.',
    );
  }

  return createSchema({
    ...declareTypes<any, any>(),
    ...this,
    ...objectDef<typeof props, typeof this.behavior>(
      { ...this.shape, ...props },
      this.behavior,
      this.errorMap,
    ),
    checks: [...this.checks],
  });
};
