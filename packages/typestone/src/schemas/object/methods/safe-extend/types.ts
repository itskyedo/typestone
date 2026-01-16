import { type RawInput, type RawOutput } from '../../../../def/def.ts';
import { type ReplaceSchemaTypes } from '../../../schema/schema.ts';
import { type ObjectSchema } from '../../object.ts';
import {
  type ObjectInput,
  type ObjectOutput,
  type ObjectShape,
} from '../../types.ts';

export type SafeExtendObject<
  TSchema extends ObjectSchema<any>,
  TProps extends ObjectShape,
> = (Record<string, never> extends TProps
  ? TSchema
  : ReplaceSchemaTypes<
      ObjectSchema<
        SafeExtendShape<TSchema['shape'], TProps>,
        TSchema['behavior']
      >,
      SafeExtendTypeProp<RawInput<TSchema>, ObjectInput<TProps>>,
      SafeExtendTypeProp<RawOutput<TSchema>, ObjectOutput<TProps>>
    >) & {};

export type SafeExtendProps<
  TSchema extends ObjectSchema<any>,
  TProps extends ObjectShape,
> = {
  [Key in keyof TProps]: Key extends keyof RawOutput<TSchema>
    ? RawOutput<TProps[Key]> extends RawOutput<TSchema>[Key]
      ? TProps[Key]
      : never
    : TProps[Key];
};

type SafeExtendShape<
  TShape extends ObjectShape,
  TProps extends ObjectShape,
> = Omit<TShape, keyof TProps> & TProps;

type SafeExtendTypeProp<
  TRawObject extends Record<string, any>,
  TProps extends ObjectShape,
> = {
  [Key in keyof TRawObject as Key extends keyof TProps
    ? never
    : Key]: TRawObject[Key];
} & {
  [Key in keyof TProps]: Key extends keyof TRawObject
    ? TRawObject[Key] & TProps[Key]
    : TProps[Key];
} extends infer OutType
  ? { [Key in keyof OutType]: OutType[Key] }
  : never;
