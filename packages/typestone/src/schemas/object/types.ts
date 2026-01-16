import { type RawInput, type RawOutput } from '../../def/def.ts';
import {
  type ModeSwitch,
  type ProcessMode,
} from '../../internal/process/types.ts';
import { type OptionalSchema } from '../optional/optional.ts';
import { type Schema } from '../schema/schema.ts';

export type ObjectBehavior = 'strip' | 'strict' | 'loose';

export type ObjectShape = Record<string | number, Schema>;

export type ObjectInput<TShape extends ObjectShape> = BuildObject<
  'encode',
  TShape
> & {};

export type ObjectOutput<TShape extends ObjectShape> = BuildObject<
  'decode',
  TShape
> & {};

type BuildObject<TMode extends ProcessMode, TShape extends ObjectShape> = {
  -readonly [Key in keyof TShape as TShape[Key] extends OptionalSchema<
    any,
    TMode extends 'encode' ? any : undefined
  >
    ? never
    : Key]-?: ModeSwitch<TMode, RawInput<TShape[Key]>, RawOutput<TShape[Key]>>;
} & {
  -readonly [Key in keyof TShape as TShape[Key] extends OptionalSchema<
    any,
    TMode extends 'encode' ? any : undefined
  >
    ? Key
    : never]+?: ModeSwitch<
    TMode,
    RawInput<TShape[Key]>,
    RawOutput<TShape[Key]>
  >;
} extends infer OutType
  ? { [Key in keyof OutType]: OutType[Key] }
  : never;
