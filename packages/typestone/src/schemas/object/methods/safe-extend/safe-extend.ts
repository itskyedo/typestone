import { declareTypes } from '../../../../internal/declare-types/declare-types.ts';
import { createSchema } from '../../../schema/schema.ts';
import { objectDef } from '../../def.ts';
import { type ObjectSchema } from '../../object.ts';
import { type ObjectShape } from '../../types.ts';
import { type SafeExtendObject, type SafeExtendProps } from './types.ts';

export type SafeExtendMethod<TShape extends ObjectShape = ObjectShape> = <
  const TSchema extends ObjectSchema<TShape>,
  const TProps extends ObjectShape,
>(
  this: TSchema,
  props: SafeExtendProps<TSchema, TProps>,
) => SafeExtendObject<TSchema, TProps>;

export const safeExtend: SafeExtendMethod = function (props) {
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
