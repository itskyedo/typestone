import { type RawInput, type RawOutput } from '../../../../def/def.ts';
import { type OptionalSchema } from '../../../optional/optional.ts';
import { type ReplaceSchemaTypes } from '../../../schema/schema.ts';
import { type ObjectSchema } from '../../object.ts';
import { type ObjectShape } from '../../types.ts';

export type PartialAllObject<TSchema extends ObjectSchema<any>> =
  ReplaceSchemaTypes<
    ObjectSchema<PartialAllShape<TSchema['shape']>, TSchema['behavior']>,
    Partial<RawInput<TSchema>>,
    Partial<RawOutput<TSchema>>
  > & {};

export type PartialAllShape<TShape extends ObjectShape> = {
  [Key in keyof TShape]: TShape[Key] extends OptionalSchema
    ? TShape[Key]
    : OptionalSchema<TShape[Key], undefined>;
};
