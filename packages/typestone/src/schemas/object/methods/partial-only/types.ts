import { type RawInput, type RawOutput } from '../../../../def/def.ts';
import { type OptionalSchema } from '../../../optional/optional.ts';
import { type ReplaceSchemaTypes } from '../../../schema/schema.ts';
import { type ObjectSchema } from '../../object.ts';
import { type ObjectShape } from '../../types.ts';

export type PartialOnlyObject<
  TSchema extends ObjectSchema<any>,
  TProps extends Partial<Record<keyof TSchema['shape'], true>>,
> = (Record<any, never> extends TProps
  ? TSchema
  : ReplaceSchemaTypes<
      ObjectSchema<
        PartialOnlyShape<TSchema['shape'], TProps>,
        TSchema['behavior']
      >,
      PartialOnlyTypeProp<RawInput<TSchema>, TProps>,
      PartialOnlyTypeProp<RawOutput<TSchema>, TProps>
    >) & {};

export type PartialOnlyShape<
  TShape extends ObjectShape,
  TProps extends Partial<Record<keyof TShape, true>>,
> = {
  [Key in keyof TShape]: Key extends TProps[number]
    ? TShape[Key] extends OptionalSchema
      ? TShape[Key]
      : OptionalSchema<TShape[Key], undefined>
    : TShape[Key];
};

type PartialOnlyTypeProp<
  TRawObject extends Record<string, any>,
  TProps extends Partial<Record<keyof TRawObject, true>>,
> = {
  [Key in keyof TRawObject as Key extends keyof TProps
    ? TProps[Key] extends true
      ? never
      : Key
    : Key]: TRawObject[Key];
} & {
  [Key in keyof TRawObject as Key extends keyof TProps
    ? TProps[Key] extends true
      ? Key
      : never
    : never]+?: TRawObject[Key];
} extends infer OutType
  ? { [Key in keyof OutType]: OutType[Key] }
  : never;
