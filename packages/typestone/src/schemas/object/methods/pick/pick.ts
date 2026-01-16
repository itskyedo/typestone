import { isSchema } from '../../../../functions/def/def.ts';
import { type CleanObject } from '../../../../internal/type-utils/types.ts';
import { type Schema } from '../../../schema/schema.ts';
import {
  type createObject,
  type CreateObjectFunction,
} from '../../create-object.ts';
import { type ObjectSchema } from '../../object.ts';
import { type ObjectShape } from '../../types.ts';

export type PickMethod<TShape extends ObjectShape = ObjectShape> = <
  const TSchema extends ObjectSchema<TShape>,
  const TProps extends Partial<Record<keyof TSchema['shape'], true>>,
>(
  this: TSchema,
  props: TProps,
) => ObjectSchema<
  CleanObject<Pick<TSchema['shape'], Exclude<keyof TProps, symbol>>>,
  TSchema['behavior']
>;

export const attachPick: (attach: CreateObjectFunction) => PickMethod = (
  attach: typeof createObject,
) => {
  return function (props) {
    const shape: Record<string, Schema> = {};
    for (const [key, value] of Object.entries(props)) {
      if (value === true) {
        const targetProp = this.shape[key];
        if (isSchema(targetProp)) {
          shape[key] = targetProp;
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return attach(shape, this.behavior) satisfies ObjectSchema as any;
  };
};
