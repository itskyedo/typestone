import { type RawInput, type RawOutput } from '../../../../def/def.ts';
import { type ReplaceSchemaTypes } from '../../../schema/schema.ts';
import { type ObjectSchema } from '../../object.ts';
import {
  type ObjectInput,
  type ObjectOutput,
  type ObjectShape,
} from '../../types.ts';

export type ExtendObject<
  TSchema extends ObjectSchema<any>,
  TProps extends ObjectShape,
> = (Record<string, never> extends TProps
  ? TSchema
  : ReplaceSchemaTypes<
      ObjectSchema<ExtendShape<TSchema['shape'], TProps>, TSchema['behavior']>,
      ExtendTypeProp<RawInput<TSchema>, ObjectInput<TProps>>,
      ExtendTypeProp<RawOutput<TSchema>, ObjectOutput<TProps>>
    >) & {};

export type ExtendProps<TProps extends ObjectShape> = {
  [Key in keyof TProps]: TProps[Key];
};

type ExtendShape<TShape extends ObjectShape, TProps extends ObjectShape> = Omit<
  TShape,
  keyof TProps
> &
  TProps;

type ExtendTypeProp<
  TRawObject extends Record<string, any>,
  TProps extends ObjectShape,
> = {
  [Key in keyof TRawObject as Key extends keyof TProps
    ? never
    : Key]: TRawObject[Key];
} & {
  [Key in keyof TProps]: TProps[Key];
} extends infer OutType
  ? { [Key in keyof OutType]: OutType[Key] }
  : never;
